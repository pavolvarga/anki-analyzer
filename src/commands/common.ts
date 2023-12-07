import { intersection, sortBy } from 'lodash';
import { AnkiRecord, AnkiRecordContainer, CardType } from '../types';
import { ExplanationBracketType } from '../types';
import { DeckAnalysis, InfoCmdOptions } from './info/types';

function sumCardsWithSeparator(deck: Map<string, AnkiRecord>, separator: string) {
  return Array.from(deck.values()).reduce((acc, record) => {
    if (record.card1.includes(separator)) {
      acc += 1;
    }
    if (record.card2.includes(separator)) {
      acc += 1;
    }
    return acc;
  }, 0);
}

function sumCardsWithExplanation(deck: Map<string, AnkiRecord>, explanationBracket: ExplanationBracketType) {
  return Array.from(deck.values()).reduce((acc, record) => {
    if (containsExplanation(record.card1, explanationBracket)) {
      acc += 1;
    }
    if (containsExplanation(record.card2, explanationBracket)) {
      acc += 1;
    }
    return acc;
  }, 0);
}

function sumCardsWithPrefixSeparator(deck: Map<string, AnkiRecord>, prefixSeparator: string) {
  return Array.from(deck.values()).reduce((acc, record) => {
    if (containsPrefixSeparator(record.card1, prefixSeparator)) {
      acc += 1;
    }
    if (containsPrefixSeparator(record.card2, prefixSeparator)) {
      acc += 1;
    }
    return acc;
  }, 0);
}

export function containsPrefixSeparator(card: string, separator: string) {
  // no spaces - separator must be withing the word
  const regex = new RegExp(`([a-zA-Z])\\${separator}([a-zA-Z])`);
  return regex.test(card);
}

function containsExplanation(card: string, bracket: ExplanationBracketType): boolean {
  switch (bracket) {
    case 'round':
      return /\([^)]+\)/.test(card);
    case 'square':
      return /\[[^\]]+\]/.test(card);
    case 'curly':
      return /\{[^}]+\}/.test(card);
    default:
      throw new Error(`Unknown bracket type for explanation: ${bracket}`);
  }
}

function sumNotesWithTags(deck: Map<string, AnkiRecord>) {
  return Array.from(deck.values()).reduce((acc, record) => (acc += record.tags ? 1 : 0), 0);
}

function sumCards(deck: Map<string, AnkiRecord>) {
  return Array.from(deck.values()).reduce(
    (acc, record) => (acc += record.deckType === 'Basic (and reversed card)' ? 2 : 1),
    0,
  );
}

function useAllCardsSameNoteType(deck: Map<string, AnkiRecord>): boolean {
  const values = Array.from(deck.values());
  return (
    values.reduce((acc, current) => {
      acc.add(current.deckType);
      return acc;
    }, new Set<string>()).size === 1
  );
}

export function analyzeDeck(
  deck: Map<string, AnkiRecord>,
  name: string,
  options: InfoCmdOptions | undefined,
): DeckAnalysis {
  // basic analyze
  const analyze: DeckAnalysis = {
    name,
    sameNoteType: useAllCardsSameNoteType(deck),
    cardCount: sumCards(deck),
    noteCount: deck.size,
    tagsCount: sumNotesWithTags(deck),
  };

  // adiditonal / optional analyze
  if (options?.meaningSeparator) {
    analyze.cardsWithMeaningSeparator = sumCardsWithSeparator(deck, options.meaningSeparator);
  }
  if (options?.synonymSeparator) {
    analyze.cardsWithSynonymSeparator = sumCardsWithSeparator(deck, options.synonymSeparator);
  }
  if (options?.explanationBrackets) {
    analyze.cardsWithExplanation = sumCardsWithExplanation(deck, options.explanationBrackets);
  }
  if (options?.prefixSeparator) {
    analyze.cardsWithPrefixSeparator = sumCardsWithPrefixSeparator(deck, options.prefixSeparator);
  }

  return analyze;
}

/**
 * Find a deck either by an exact match or by a startsWith match.
 * If a deck is not found, error is thrown.
 * If multiple decks matches the startsWitch, error is thrown.
 *
 * Returns a tuple - [deckName, deck]
 */
export function findDeck(name: string, container: AnkiRecordContainer): [string, Map<string, AnkiRecord>] {
  const exactMatch = name.charAt(name.length - 1) !== '*';

  // full name - try to find a deck by the provided name
  if (exactMatch) {
    const deck = container.byDeck.get(name);
    if (deck === undefined) {
      throw new Error(`Deck not found: ${name}`);
    }
    return [name, deck];
  }

  // startsWith - try to find a single deck to match it
  const nameWithoutStar = name.slice(0, -1);
  const matches = Array.from(container.byDeck.keys()).filter((deckName: string) =>
    deckName.startsWith(nameWithoutStar),
  );
  if (matches.length === 0) {
    throw new Error(`Deck not found: ${name}`);
  }
  if (matches.length > 1) {
    throw new Error(`Name ${name} is not unique, these decks ${matches.join(', ')} match it.`);
  }
  return [matches[0], container.byDeck.get(matches[0])!];
}

/**
 * If tags are provided, then filter records by tags.
 * If no tags are provided, then return all records.
 */
export function filterRecords(deck: Map<string, AnkiRecord>, tags?: string[]): AnkiRecord[] {
  return (tags ?? []).length === 0
    ? Array.from(deck.values())
    : Array.from(deck.values()).filter((record) => {
        const recordTags = record.tags ?? [];
        return intersection(tags, recordTags).length > 0;
      });
}

export function sortRecords(records: AnkiRecord[], cardType: CardType): AnkiRecord[] {
  const sort = cardType === 'card1' || cardType === 'both' ? 'card1' : 'card2';
  return sortBy(records, sort);
}

/**
 * If omit is not defined show first `limit` records.
 * If omit is defined, then show records from `omit` to `omit + limit`.
 * If `omit + limit` is greater than the number of records, then show last `limit` records.
 */
export function sliceRecords<T>(records: T[], limit: number, omit: number | undefined): T[] {
  if (omit === undefined) {
    return records.slice(0, limit);
  }
  if (omit + limit > records.length) {
    return records.slice(-limit);
  }
  return records.slice(omit, omit + limit);
}

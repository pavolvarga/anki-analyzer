import { AnkiRecord } from '../types';
import { DeckAnalysis, ExplanationBracketType, InfoCmdOptions, TableRow } from './types';

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

export function convertOneAnalysis(analysis: DeckAnalysis, options: InfoCmdOptions | undefined): TableRow {
  const tableRow: TableRow = {
    Name: analysis.name,
    Notes: analysis.noteCount,
    Cards: analysis.cardCount,
    'Same Note Type': analysis.sameNoteType ? 'yes' : 'no',
    'Notes with Tags': analysis.tagsCount,
  };
  if (options?.meaningSeparator) {
    tableRow['Cards with Meaning Separator'] = analysis.cardsWithMeaningSeparator;
  }
  if (options?.synonymSeparator) {
    tableRow['Cards with Synonym separator'] = analysis.cardsWithSynonymSeparator;
  }
  if (options?.explanationBracket) {
    tableRow['Cards with Explanation'] = analysis.cardsWithExplanation;
  }
  return tableRow;
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
  if (options?.explanationBracket) {
    analyze.cardsWithExplanation = sumCardsWithExplanation(deck, options.explanationBracket);
  }

  return analyze;
}

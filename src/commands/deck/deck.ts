import { parse as parseFile } from '../../fileParser/fileParser';
import { parse as parseOptions } from './optionsParser';
import { AnkiRecord, AnkiRecordContainer } from '../../types';
import { analyzeDeck, convertOneAnalysis } from '../common';
import { IndividualTags } from './types';

/**
 * Find a deck either by an exact match or by a startsWith match.
 * If a deck is not found, error is thrown.
 * If multiple decks matches the startsWitch, error is thrown.
 *
 * Returns a tuple - [deckName, deck]
 */
function findDeck(name: string, container: AnkiRecordContainer): [string, Map<string, AnkiRecord>] {
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

type TagCount = {
  tag: string;
  count: number;
};

function countIndividualTags(deck: Map<string, AnkiRecord>): IndividualTags {
  const tagMap = Array.from(deck.values()).reduce((acc, current) => {
    (current.tags ?? []).forEach((tag: string) => {
      if (acc.has(tag)) {
        acc.set(tag, acc.get(tag)! + 1);
      } else {
        acc.set(tag, 1);
      }
    });
    return acc;
  }, new Map<string, number>());

  const arr = Array.from(tagMap.entries()).reduce((acc, entry) => {
    acc.push({ tag: entry[0], count: entry[1] });
    return acc;
  }, [] as TagCount[]);
  const sorted = arr.sort((a, b) => a.count - b.count).reverse();

  return sorted.reduce((acc, current) => {
    // @ts-ignore
    acc[current.tag] = current.count;
    return acc;
  }, {});
}

export function commandDeck(file: string, inputDeckName: string, cmdOptions: any): void {
  const records = parseFile(file);
  const options = parseOptions(cmdOptions);
  const [name, deck] = findDeck(inputDeckName, records);

  const analysis = analyzeDeck(deck, name, options);
  let table = convertOneAnalysis(analysis, options);

  // add tags if requested and they exists
  if (options?.tags) {
    const individualTagsCount = countIndividualTags(deck);
    if (Object.keys(individualTagsCount).length !== 0) {
      // @ts-ignore
      table['---------'] = '---------';
      table = Object.assign(table, individualTagsCount);
    }
  }

  console.table(table);
}

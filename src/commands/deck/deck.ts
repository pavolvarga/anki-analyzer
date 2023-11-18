import { parse as parseFile } from '../../fileParser/fileParser';
import { parse as parseOptions } from '../optionsParser';
import { AnkiRecord, AnkiRecordContainer } from '../../types';
import { analyzeDeck, convertOneAnalysis } from '../common';

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

export function commandDeck(file: string, inputDeckName: string, cmdOptions: any): void {
  const records = parseFile(file);
  const options = parseOptions(cmdOptions);
  const [name, deck] = findDeck(inputDeckName, records);

  const analysis = analyzeDeck(deck, name, options);
  const table = convertOneAnalysis(analysis, options);

  console.table(table);
}

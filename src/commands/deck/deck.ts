import { parse as parseFile } from './../fileParser/fileParser';
import { AnkiRecord, AnkiRecordContainer } from '../../types';

/**
 * Find a deck either by an exact match or by a startsWith match.
 * If a deck is not found, error is thrown.
 * If multiple decks matches the startsWitch, error is thrown.
 */
function findDeck(name: string, container: AnkiRecordContainer): Map<string, AnkiRecord> {
  const exactMatch = name.charAt(name.length - 1) !== '*';

  // full name - try to find a deck by the provided name
  if (exactMatch) {
    const deck = container.byDeck.get(name);
    if (deck === undefined) {
      throw new Error(`Deck not found: ${name}`);
    }
    return deck;
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
    throw new Error(`Name ${name} is not unique, ${matches.length} decks match it.`);
  }
  return container.byDeck.get(matches[0])!;
}

export function commandDeck(file: string, deckName: string): void {
  const records = parseFile(file);
  const deck = findDeck(deckName, records);

  console.log(deck.size);
}

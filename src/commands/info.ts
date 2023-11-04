import { parse } from '../parser/parser';
import { AnkiRecord } from '../types';
import { DeckAnalysis } from './types';

function useAllCardsSameNoteType(deck: Map<string, AnkiRecord>): boolean {
  const values = Array.from(deck.values());
  return (
    values.reduce((acc, current) => {
      acc.add(current.deckType);
      return acc;
    }, new Set<string>()).size === 1
  );
}

function sumCards(deck: Map<string, AnkiRecord>) {
  return Array.from(deck.values()).reduce(
    (acc, record) => (acc += record.deckType === 'Basic (and reversed card)' ? 2 : 1),
    0,
  );
}

function analyzeDeck(deck: Map<string, AnkiRecord>): DeckAnalysis {
  return {
    sameNoteType: useAllCardsSameNoteType(deck),
    cardCount: sumCards(deck),
  };
}

export function commandInfo(file: string): void {
  const records = parse(file);
  const analysis = Array.from(records.byDeck.entries())
    .map(([name, deck]) => [name, analyzeDeck(deck), deck.size])
    .sort((a, b) => (b[2] as number) - (a[2] as number));

  console.table(analysis);
}

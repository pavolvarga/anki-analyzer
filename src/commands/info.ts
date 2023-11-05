import { parse } from '../parser/parser';
import { AnkiRecord } from '../types';
import { DeckAnalysis, TableRow } from './types';

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

function analyzeDeck(deck: Map<string, AnkiRecord>, name: string): DeckAnalysis {
  return {
    name,
    sameNoteType: useAllCardsSameNoteType(deck),
    cardCount: sumCards(deck),
    noteCount: deck.size,
  };
}

function convertToTableFormat(analysis: DeckAnalysis[]): TableRow[] {
  return analysis.map((one: DeckAnalysis) => ({
    Name: one.name,
    Notes: one.noteCount,
    Cards: one.cardCount,
    'Same Note Type': one.sameNoteType ? 'yes' : 'no',
  }));
}

function createSummary(analysis: DeckAnalysis[]): TableRow {
  return analysis.reduce(
    (acc, current) => {
      acc.Notes += current.noteCount;
      acc.Cards += current.cardCount;
      return acc;
    },
    {
      Name: '',
      Notes: 0,
      Cards: 0,
      'Same Note Type': '',
    },
  );
}

export function commandInfo(file: string): void {
  const records = parse(file);
  const analysis = Array.from(records.byDeck.entries())
    .map(([name, deck]) => analyzeDeck(deck, name))
    .sort((analysis1: DeckAnalysis, analysis2: DeckAnalysis) => analysis2.noteCount - analysis1.noteCount);
  const summary = createSummary(analysis);

  const table = [...convertToTableFormat(analysis), summary];

  console.table(table);
}

import { parse as parseFile } from '../../fileParser/fileParser';
import { parse as parseOptions } from './optionsParser';
import { AnkiRecord } from '../../types';
import { DeckAnalysis, ExplanationBracketType, InfoCmdOptions, TableRow } from './types';

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

function sumNotesWithTags(deck: Map<string, AnkiRecord>) {
  return Array.from(deck.values()).reduce((acc, record) => (acc += record.tags ? 1 : 0), 0);
}

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

function containsExplanation(card: string, bracket: ExplanationBracketType): boolean {
  switch (bracket) {
    case 'round':
      return /\([^)]+\)/.test(card);
    case 'square':
      return /\[[^\]]+\]/.test(card);
    case 'curly':
      return /\{[^}]+\}/.test(card);
    case 'angle':
      return /<[^>]+>/.test(card);
    default:
      throw new Error(`Unknown bracket type for explanation: ${bracket}`);
  }
}

function sumCardsWithExplanation(deck: Map<string, AnkiRecord>, explanationBracket: ExplanationBracketType) {
  return Array.from(deck.values()).reduce(
    (acc, record) => {
      if (containsExplanation(record.card1, explanationBracket)) {
        acc += 1;
      }
      if (containsExplanation(record.card2, explanationBracket)) {
        acc += 1;
      }
      return acc;
    },
    0,
  );
}

function analyzeDeck(deck: Map<string, AnkiRecord>, name: string, options: InfoCmdOptions | undefined): DeckAnalysis {
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

function convertOneAnalysis(analysis: DeckAnalysis, options: InfoCmdOptions | undefined): TableRow {
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

function convertToTableFormat(analysis: DeckAnalysis[], options: InfoCmdOptions | undefined): TableRow[] {
  return analysis.map((one: DeckAnalysis) => convertOneAnalysis(one, options));
}

function createSummary(analysis: DeckAnalysis[], options: InfoCmdOptions | undefined): TableRow {
  const tableRow: TableRow = analysis.reduce(
    (acc, current) => {
      acc.Notes += current.noteCount;
      acc.Cards += current.cardCount;
      acc['Notes with Tags'] += current.tagsCount;
      acc['Cards with Meaning Separator'] += options?.meaningSeparator ? current!.cardsWithMeaningSeparator! : 0;
      acc['Cards with Synonym separator'] += options?.synonymSeparator ? current!.cardsWithSynonymSeparator! : 0;
      acc['Cards with Explanation'] += options?.explanationBracket ? current!.cardsWithExplanation! : 0;
      return acc;
    },
    {
      Name: '--Summary--',
      Notes: 0,
      Cards: 0,
      'Same Note Type': '',
      'Notes with Tags': 0,
      'Cards with Meaning Separator': 0,
      'Cards with Synonym separator': 0,
      'Cards with Explanation': 0,
    },
  );
  if (options?.meaningSeparator === undefined) {
    delete tableRow['Cards with Meaning Separator'];
  }
  if (options?.synonymSeparator === undefined) {
    delete tableRow['Cards with Synonym separator'];
  }
  if (options?.explanationBracket === undefined) {
    delete tableRow['Cards with Explanation'];
  }

  return tableRow;
}

export function commandInfo(file: string, cmdOptions: any): void {
  const records = parseFile(file);
  const options = parseOptions(cmdOptions);

  const analysis = Array.from(records.byDeck.entries())
    .map(([name, deck]) => analyzeDeck(deck, name, options))
    .sort((analysis1: DeckAnalysis, analysis2: DeckAnalysis) => analysis2.noteCount - analysis1.noteCount);
  const summary = createSummary(analysis, options);

  if (options?.meaningSeparator) {
    console.log(`Used meaning separator: "${options!.meaningSeparator}"`);
  }
  if (options?.synonymSeparator) {
    console.log(`Used meaning separator: "${options!.synonymSeparator}"`);
  }
  if (options?.explanationBracket) {
    console.log(`Used bracket type for explanation: "${options!.explanationBracket}"`);
  }
  const table = [...convertToTableFormat(analysis, options), summary];

  console.table(table);
}

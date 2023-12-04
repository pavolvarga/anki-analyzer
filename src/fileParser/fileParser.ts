import fs from 'fs';

import { ParsedAnkiFile } from './types';
import { parseMedata } from './metadataParser';
import { parseRecords } from './recordParser';
import { AnkiRecord, AnkiRecordContainer } from '../types';
import { assertRecords } from './assertions';

function createRecordContainer(records: AnkiRecord[]): AnkiRecordContainer {
  const all = new Map<string, AnkiRecord>();
  const byDeck = new Map<string, Map<string, AnkiRecord>>();

  records.forEach((record: AnkiRecord) => {
    all.set(record.id, record);

    if (byDeck.get(record.deckName) === undefined) {
      byDeck.set(record.deckName, new Map<string, AnkiRecord>());
    }
    byDeck.get(record.deckName)!.set(record.id, record);
  });

  return {
    all,
    byDeck,
  };
}

export function parse(fileName: string): AnkiRecordContainer {
  const { metadata: metadataLines, cards: cardsLines } = loadFile(fileName);

  const metadata = parseMedata(metadataLines);
  const records = parseRecords(cardsLines, metadata);

  // exported decks must be valid
  assertRecords(records);

  return createRecordContainer(records);
}

/**
 * Load the anki file containing all decks and cards into memory.
 * The file is spilit into two pards - metadata & cards themselfs.
 */
function loadFile(fileName: string): ParsedAnkiFile {
  if (!fs.existsSync(fileName)) {
    throw new Error(`Input file not found: ${fileName}`);
  }

  const metadata: string[] = [];
  const cards: string[] = [];

  const wholeFile = fs.readFileSync(fileName, 'utf-8');
  wholeFile.split(/\r?\n/).forEach((line: string) => {
    const trimmed = line.trim();
    if (trimmed !== '') {
      if (line.startsWith('#')) {
        metadata.push(trimmed);
      } else {
        cards.push(trimmed);
      }
    }
  });

  return {
    metadata,
    cards,
  };
}

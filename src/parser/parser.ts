import fs from 'fs';

import { ParsedAnkiFile } from './types';
import { parseMedata } from './metadataParser';

export function parse(fileName: string): void {
  const { metadata: metadataLines } = loadFile(fileName);

  const metadata = parseMedata(metadataLines);

  console.log(metadata);
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

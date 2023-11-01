import { AnkiMetadata, AnkiRecord } from './types';

function parseRecordLine(line: string, metadata: AnkiMetadata): AnkiRecord {
  const { separator, deckColumnPosition, guidColumnPosition, notetypeColumnPosition, tagsColumnPosition } = metadata;
  const splitted = line.split(separator);

  return {
    id: splitted[guidColumnPosition - 1].trim(),
    deckName: splitted[deckColumnPosition - 1].trim(),
    deckType: splitted[notetypeColumnPosition - 1].trim(),
    tags: splitted.length === tagsColumnPosition ? splitted[tagsColumnPosition - 1].trim().split(' ') : undefined,
    card1: splitted[deckColumnPosition].trim(),
    card2: splitted[deckColumnPosition + 1].trim(),
  };
}

export function mergeMultilineRecord(splittedRecord: string[]): string {
  return splittedRecord
    .map((r: string) => r.replace('\n', ''))
    .map((r: string) => r.replace('"', ''))
    .join('');
}

export function parseRecords(input: string[], metadata: AnkiMetadata): AnkiRecord[] {
  const result: AnkiRecord[] = [];

  let splitRecords = [];

  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    if (line.includes('"')) {
      if (splitRecords.length === 0) {
        splitRecords.push(line);
      } else {
        splitRecords.push(line);
        // join and parse
        const mergeIntoSingleLine = mergeMultilineRecord(splitRecords);
        result.push(parseRecordLine(mergeIntoSingleLine, metadata));
        splitRecords = [];
      }
    } else {
      if (splitRecords.length === 0) {
        result.push(parseRecordLine(line, metadata));
      } else {
        splitRecords.push(line);
      }
    }
  }

  return result;
}

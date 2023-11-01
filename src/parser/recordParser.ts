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

  let splitRecordStartIdx = -1;
  let splitRecords = [];

  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    // record is in single line - simple parsing
    if (!line.includes('"') && splitRecordStartIdx === -1) {
      result.push(parseRecordLine(line, metadata));
      // record is split in multiple lines - merge those lines together and then parse
    } else {
      // the beginn of split record
      if (splitRecordStartIdx === -1) {
        splitRecordStartIdx = i;
        splitRecords.push(line);
      } else {
        // content of split record
        if (!line.includes('"')) {
          splitRecords.push(line);
        } else {
          splitRecords.push(line);

          // reset the index, so that next line is treaded as possible single line
          splitRecordStartIdx = -1;

          // join and parse
          const mergeIntoSingleLine = mergeMultilineRecord(splitRecords);
          result.push(parseRecordLine(mergeIntoSingleLine, metadata));

          splitRecords = [];
        }
      }
    }
  }

  return result;
}

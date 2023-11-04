import { AnkiMetadata, AnkiRecord } from './types';

function parseCardContent(splitRecord: boolean, content: string): string {
  if (!splitRecord) {
    return content.trim();
  }

  // in case of split record normalize how are words connected - no space, just ','
  if (content.includes(',')) {
    return content.trim().replace(/,\s{1}/g, ',');
  }
  return content.trim();
}

function parseRecordLine(line: string, metadata: AnkiMetadata, splitRecord: boolean): AnkiRecord {
  const { separator, deckColumnPosition, guidColumnPosition, notetypeColumnPosition, tagsColumnPosition } = metadata;
  const splitted = line.trim().split(separator);

  return {
    id: splitted[guidColumnPosition - 1].trim(),
    deckName: splitted[deckColumnPosition - 1].trim(),
    deckType: splitted[notetypeColumnPosition - 1].trim(),
    tags: splitted.length === tagsColumnPosition ? splitted[tagsColumnPosition - 1].trim().split(' ') : undefined,
    card1: parseCardContent(splitRecord, splitted[deckColumnPosition]),
    card2: parseCardContent(splitRecord, splitted[deckColumnPosition + 1]),
  };
}

function isFullRecord(metadata: AnkiMetadata, tabsCount: number, quotesCount: number): boolean {
  const { tagsColumnPosition } = metadata;
  const tabsOk = tabsCount === tagsColumnPosition - 1 || tabsCount === tagsColumnPosition - 2;
  const quotesOk = quotesCount % 2 === 0;

  return tabsOk && quotesOk;
}

export function parseRecords(input: string[], metadata: AnkiMetadata): AnkiRecord[] {
  const result: AnkiRecord[] = [];

  let splitRecordTabsCount = 0;
  let splitRecordQuotesCount = 0;
  let splitRecordLines = [];

  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    // todo: use separator from the metadata
    const tabsCount = (line.match(/\t/g) || []).length;
    const quotesCount = (line.match(/"/g) || []).length;

    // record is not split into several lines
    if (isFullRecord(metadata, tabsCount, quotesCount)) {
      result.push(parseRecordLine(line, metadata, false));
    } else {
      // record is split into multiple lines

      splitRecordTabsCount += tabsCount;
      splitRecordQuotesCount += quotesCount;
      splitRecordLines.push(line);

      // all record's lines are collected - we have the whole record saved
      if (isFullRecord(metadata, splitRecordTabsCount, splitRecordQuotesCount)) {
        const wholeRecord = splitRecordLines.join('');
        result.push(parseRecordLine(wholeRecord, metadata, true));

        // reset temp vars for next usage
        splitRecordTabsCount = 0;
        splitRecordQuotesCount = 0;
        splitRecordLines = [];
      }
    }
  }

  return result;
}

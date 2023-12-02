import { AnkiRecord } from '../../types';

// eslint-disable-next-line no-unused-vars
type MeaningSeparatorAssertionFn = (record: AnkiRecord) => void;

export function assertMeaningSepartorIsNotUsed(record: AnkiRecord, meaningSeparator: string, cardNum: 1 | 2): void {
  const cardVar = `card${cardNum}`;
  // @ts-ignore
  if (record[cardVar].includes(meaningSeparator)) {
    // @ts-ignore
    throw new Error(`Meaning separator is used in record ${record.id} in ${cardVar}: ${record[cardVar]}`);
  }
}

export function assertMeaningSepartorIsUsed(record: AnkiRecord, meaningSeparator: string, cardNum: 1 | 2): void {
  const cardVar = `card${cardNum}`;
  // @ts-ignore
  if (!record[cardVar].includes(meaningSeparator)) {
    // @ts-ignore
    throw new Error(`Meaning separator is not used in record ${record.id} in ${cardVar}: ${record[cardVar]}`);
  }
}

export function assertRecords(records: AnkiRecord[], assertions: MeaningSeparatorAssertionFn[]): void {
  records.forEach((record: AnkiRecord) => {
    assertions.forEach((assertion: MeaningSeparatorAssertionFn) => assertion(record));
  });
}

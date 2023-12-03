import util from 'util';
import { AnkiRecord } from '../types';

export function printRecord(record: AnkiRecord, tab?: boolean): void {
  console.info(`${tab ? '  ' : ''} ${util.inspect(record, { depth: null, breakLength: Infinity })}`);
}

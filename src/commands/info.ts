import { parse } from '../parser/parser';

export function commandInfo(file: string): void {
  const records = parse(file);

  console.log(records.all.size, records.byDeck.size);
  console.log(records.byDeck.keys());
}

import { parse } from '../parser/parser';

export function commandInfo(file: string): void {
  parse(file);
}

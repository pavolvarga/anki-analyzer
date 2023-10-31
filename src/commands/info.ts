import { parse } from '../parser';

export function commandInfo(file: string): void {
  parse(file);
}

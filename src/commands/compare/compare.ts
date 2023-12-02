import { parse as parseFile } from '../../fileParser/fileParser';
import { parse as parseOptions } from '../optionsParser';

export function commandCompare(
  file: string,
  generalDeck: string,
  specificDeck: string,
  tag: string,
  cmdOptions: any,
): void {
  const records = parseFile(file);
  const options = parseOptions(cmdOptions);

  console.log(records, file, generalDeck, specificDeck, tag, options);
}

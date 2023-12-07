import { DeckCmdOptions } from './types';
import { parse as baseParseOptions } from '../info/optionsParser';

function isEmptyObject(obj: any): boolean {
  return typeof obj === 'object' && obj !== null && Object.keys(obj).length === 0;
}

export function parse(options: any): DeckCmdOptions | undefined {
  if (options === undefined || isEmptyObject(options)) {
    return undefined;
  }
  return {
    ...baseParseOptions(options),
    countTags: options.countTags ? true : false,
    countTagCombinations: options.countTagCombinations ? true : false,
  } as DeckCmdOptions;
}

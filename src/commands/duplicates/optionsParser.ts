import { DEFAULT_LIMIT_ROW_COUNT, DEFAULT_SYNONYM_SEPARATOR } from '../../const';
import { parseOptionLimitRows, parseOptionOmitRows, parseOptionTags } from '../optionsParser';
import { DuplicatesCmdOptions } from './types';

export function parse(options: any): DuplicatesCmdOptions {
  if (options === undefined) {
    return {
      synonymSeparator: DEFAULT_SYNONYM_SEPARATOR,
      tags: undefined,
      cardType: undefined,
      limitRowCount: DEFAULT_LIMIT_ROW_COUNT,
      omitRowCount: undefined,
    };
  }

  return {
    synonymSeparator: options.synonymSeparator ? options.synonymSeparator : DEFAULT_SYNONYM_SEPARATOR,
    tags: parseOptionTags(options),
    cardType: options.showDuplicatesTable ? options.showDuplicatesTable : undefined,
    omitRowCount: parseOptionOmitRows(options),
    limitRowCount: parseOptionLimitRows(options) ?? DEFAULT_LIMIT_ROW_COUNT,
  };
}

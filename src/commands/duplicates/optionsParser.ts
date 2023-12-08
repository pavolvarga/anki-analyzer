import { DEFAULT_LIMIT_ROW_COUNT, DEFAULT_SYNONYM_SEPARATOR } from '../../const';
import { parseOptionLimitRows, parseOptionOmitRows } from '../optionsParser';
import { DuplicatesCmdOptions } from './types';

export function parse(options: any): DuplicatesCmdOptions {
  if (options === undefined) {
    return {
      synonymSeparator: DEFAULT_SYNONYM_SEPARATOR,
      tags: undefined,
      cardType: undefined,
      limitRowCount: DEFAULT_LIMIT_ROW_COUNT,
    };
  }

  const limitRowCount = parseOptionLimitRows(options);
  const omitRowCount = parseOptionOmitRows(options);

  return {
    synonymSeparator: options.synonymSeparator ? options.synonymSeparator : DEFAULT_SYNONYM_SEPARATOR,
    tags: options.tags ? options.tags : undefined,
    cardType: options.showDuplicatesTable ? options.showDuplicatesTable : undefined,
    omitRowCount,
    limitRowCount: limitRowCount === undefined ? DEFAULT_LIMIT_ROW_COUNT : limitRowCount,
  };
}

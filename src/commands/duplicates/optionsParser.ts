import { DEFAULT_LIMIT_ROW_COUNT, DEFAULT_SYNONYM_SEPARATOR } from '../../const';
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

  return {
    synonymSeparator: options.synonymSeparator ? options.synonymSeparator : DEFAULT_SYNONYM_SEPARATOR,
    tags: options.tags ? options.tags : undefined,
    cardType: options.showDuplicatesTable ? options.showDuplicatesTable : undefined,
    limitRowCount: options.limitRows ? parseInt(options.limitRows, 10) : DEFAULT_LIMIT_ROW_COUNT,
    omitRowCount: options.omitRows ? parseInt(options.omitRows, 10) : undefined,
  };
}

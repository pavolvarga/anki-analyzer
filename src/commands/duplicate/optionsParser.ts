import { DEFAULT_MAX_ROW_COUNT, DEFAULT_SYNONYM_SEPARATOR } from '../const';
import { DuplicateCmdOptions } from './types';

export function parse(options: any): DuplicateCmdOptions {
  if (options === undefined) {
    return {
      synonymSeparator: DEFAULT_SYNONYM_SEPARATOR,
      tags: undefined,
      cardType: undefined,
      maxRowCount: DEFAULT_MAX_ROW_COUNT,
    };
  }

  return {
    synonymSeparator: options.synonymSeparator ? options.synonymSeparator : DEFAULT_SYNONYM_SEPARATOR,
    tags: options.tags ? options.tags : undefined,
    cardType: options.showDuplicatesTable ? options.showDuplicatesTable : undefined,
    maxRowCount: options.maxRowCount ? options.maxRowCount : DEFAULT_MAX_ROW_COUNT,
  };
}

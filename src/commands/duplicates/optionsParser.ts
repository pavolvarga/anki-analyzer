import { DEFAULT_LIMIT_ROW_COUNT, DEFAULT_SYNONYM_SEPARATOR } from '../../const';
import { DuplicatesCmdOptions } from './types';
import {
  parseOptionLimitRows,
  parseOptionOmitRows,
  parseOptionSynonymSeparator,
  parseOptionTags,
} from '../optionsParser';

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
    synonymSeparator: parseOptionSynonymSeparator(options) ?? DEFAULT_SYNONYM_SEPARATOR,
    tags: parseOptionTags(options),
    cardType: options.showDuplicatesTable,
    omitRowCount: parseOptionOmitRows(options),
    limitRowCount: parseOptionLimitRows(options) ?? DEFAULT_LIMIT_ROW_COUNT,
  };
}

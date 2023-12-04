import { DEFAULT_SYNONYM_SEPARATOR } from '../const';
import { DuplicateCmdOptions } from './types';

export function parse(options: any): DuplicateCmdOptions {
  if (options === undefined) {
    return {
      synonymSeparator: DEFAULT_SYNONYM_SEPARATOR,
      tags: undefined,
    };
  }

  return {
    synonymSeparator: options.synonymSeparator ? options.synonymSeparator : DEFAULT_SYNONYM_SEPARATOR,
    tags: options.tags ? options.tags : undefined,
  };
}

import { ListCmdOptions, ListOperation } from './types';
import { DEFAULT_LIMIT_ROW_COUNT, DEFAULT_MEANING_SEPARATOR, DEFAULT_SYNONYM_SEPARATOR } from '../../const';
import {
  parseOptionExplanationBrackets,
  parseOptionLimitRows,
  parseOptionMeaningSeparator,
  parseOptionOmitRows,
  parseOptionSynonymSeparator,
  parseOptionPrefixSeparator,
  parseOptionTags,
} from '../optionsParser';

export function parse(options: any): ListCmdOptions {
  if (options === undefined) {
    throw new Error('At least one --list* option must be specified');
  }

  const {
    listCardsWithMeaningSeparator,
    listCardsWithSynonymSeparator,
    listCardsWithExplanationBrackets,
    listCardsWithPrefixSeparator,
  } = options;

  if (
    listCardsWithMeaningSeparator === undefined &&
    listCardsWithSynonymSeparator === undefined &&
    listCardsWithExplanationBrackets === undefined &&
    listCardsWithPrefixSeparator === undefined
  ) {
    throw new Error('At least one --list* option must be specified');
  }

  if (listCardsWithPrefixSeparator !== undefined && options.prefixSeparator === undefined) {
    throw new Error('--prefix-separator must be specified when --list-cards-with-prefix-separator is specified');
  }

  let operations: ListOperation[] = [];
  if (listCardsWithMeaningSeparator !== undefined) {
    operations.push('--list-cards-with-meaning-separator');
  }
  if (listCardsWithSynonymSeparator !== undefined) {
    operations.push('--list-cards-with-synonym-separator');
  }
  if (listCardsWithExplanationBrackets !== undefined) {
    operations.push('--list-cards-with-explanation-brackets');
  }
  if (listCardsWithPrefixSeparator !== undefined) {
    operations.push('--list-cards-with-prefix-separator');
  }

  return {
    operations,
    cardType: options.card ? options.card : 'both',
    meaningSeparator: parseOptionMeaningSeparator(options) ?? DEFAULT_MEANING_SEPARATOR,
    synonymSeparator: parseOptionSynonymSeparator(options) ?? DEFAULT_SYNONYM_SEPARATOR,
    explanationBrackets: parseOptionExplanationBrackets(options),
    tags: parseOptionTags(options),
    prefixSeparator: parseOptionPrefixSeparator(options),
    omitRowCount: parseOptionOmitRows(options),
    limitRowCount: parseOptionLimitRows(options) ?? DEFAULT_LIMIT_ROW_COUNT,
  };
}

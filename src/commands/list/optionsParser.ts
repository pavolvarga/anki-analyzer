import { ListCmdOptions, ListOperation } from './types';
import {
  DEFAULT_EXPLANATION_BRACKET,
  DEFAULT_LIMIT_ROW_COUNT,
  DEFAULT_MEANING_SEPARATOR,
  DEFAULT_SYNONYM_SEPARATOR,
} from '../../const';
import { parseOptionLimitRows, parseOptionOmitRows } from '../optionsParser';

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

  const limitRowCount = parseOptionLimitRows(options);
  const omitRowCount = parseOptionOmitRows(options);

  return {
    meaningSeparator: options.meaningSeparator ? options.meaningSeparator : DEFAULT_MEANING_SEPARATOR,
    synonymSeparator: options.synonymSeparator ? options.synonymSeparator : DEFAULT_SYNONYM_SEPARATOR,
    explanationBrackets: options.explanationBracket ? options.explanationBracket : DEFAULT_EXPLANATION_BRACKET,
    tags: options.tags,
    cardType: options.card ? options.card : 'both',
    prefixSeparator: options.prefixSeparator ? options.prefixSeparator : undefined,
    operations,
    omitRowCount,
    limitRowCount: limitRowCount === undefined ? DEFAULT_LIMIT_ROW_COUNT : limitRowCount,
  };
}

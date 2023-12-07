import { ListCmdOptions, ListOperation } from './types';
import {
  DEFAULT_EXPLANATION_BRACKET,
  DEFAULT_LIMIT_ROW_COUNT,
  DEFAULT_MEANING_SEPARATOR,
  DEFAULT_SYNONYM_SEPARATOR,
} from '../../const';

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
    meaningSeparator: options.meaningSeparator ? options.meaningSeparator : DEFAULT_MEANING_SEPARATOR,
    synonymSeparator: options.synonymSeparator ? options.synonymSeparator : DEFAULT_SYNONYM_SEPARATOR,
    explanationBrackets: options.explanationBracket ? options.explanationBracket : DEFAULT_EXPLANATION_BRACKET,
    tags: options.tags,
    cardType: options.card ? options.card : 'both',
    limitRowCount: options.limitRows ? parseInt(options.limitRows) : DEFAULT_LIMIT_ROW_COUNT,
    prefixSeparator: options.prefixSeparator ? options.prefixSeparator : undefined,
    operations,
    omitRowCount: options.omitRows ? parseInt(options.omitRows) : undefined,
  };
}

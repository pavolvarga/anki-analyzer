import { ListCmdOptions, ListOperation } from './types';
import {
  DEFAULT_EXPLANATION_BRACKET,
  DEFAULT_MAX_ROW_COUNT,
  DEFAULT_MEANING_SEPARATOR,
  DEFAULT_SYNONYM_SEPARATOR,
} from '../const';

export function parse(options: any): ListCmdOptions {
  if (options === undefined) {
    throw new Error('At least one --list* option must be specified');
  }

  const { listCardsWithMeaningSeparator, listCardsWithSynonymSeparator, listCardsWithExplanationBrackets } = options;

  if (
    listCardsWithMeaningSeparator === undefined &&
    listCardsWithSynonymSeparator === undefined &&
    listCardsWithExplanationBrackets === undefined
  ) {
    throw new Error('At least one --list* option must be specified');
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

  return {
    meaningSeparator: options.meaningSeparator ? options.meaningSeparator : DEFAULT_MEANING_SEPARATOR,
    synonymSeparator: options.synonymSeparator ? options.synonymSeparator : DEFAULT_SYNONYM_SEPARATOR,
    explanationBrackets: options.explanationBracket ? options.explanationBracket : DEFAULT_EXPLANATION_BRACKET,
    tags: options.tags,
    cardType: options.cardType ? options.cardType : 'both',
    maxRowCount: options.maxRowCount ? options.maxRowCount : DEFAULT_MAX_ROW_COUNT,
    operations,
  };
}

import { AnkiRecord, CardType, ExplanationBracketType } from '../../types';
import { containsPrefixSeparator } from '../common';
import { ListCmdOptions, ListResult } from './types';

function findRecordsBySeparator(deck: AnkiRecord[], separator: string, cardType: CardType): AnkiRecord[] {
  return deck.filter((record) => {
    switch (cardType) {
      case 'card1':
        return record.card1.includes(separator);
      case 'card2':
        return record.card2.includes(separator);
      case 'both':
        return record.card1.includes(separator) || record.card2.includes(separator);
      default:
        throw new Error(`Unknown card type: ${cardType}`);
    }
  });
}

function createRegex(explanationBrackets: ExplanationBracketType): RegExp {
  switch (explanationBrackets) {
    case 'round':
      return /\(.*?\)/;
    case 'curly':
      return /\{.*?\}/;
    case 'square':
      return /\[.*?\]/;
    default:
      throw new Error(`Unknown explanation bracket type: ${explanationBrackets}`);
  }
}

function findRecordsByExplanationBrackets(
  deck: AnkiRecord[],
  explanationBrackets: ExplanationBracketType,
  cardType: CardType,
): AnkiRecord[] {
  const regex = createRegex(explanationBrackets);
  return deck.filter((record) => {
    switch (cardType) {
      case 'card1':
        return regex.test(record.card1);
      case 'card2':
        return regex.test(record.card2);
      case 'both':
        return regex.test(record.card1) || regex.test(record.card2);
      default:
        throw new Error(`Unknown card type: ${cardType}`);
    }
  });
}

function findRecordsByPrefixSeparator(deck: AnkiRecord[], prefixSeparator: string, cardType: CardType): AnkiRecord[] {
  return deck.filter((record) => {
    switch (cardType) {
      case 'card1':
        return containsPrefixSeparator(record.card1, prefixSeparator);
      case 'card2':
        return containsPrefixSeparator(record.card2, prefixSeparator);
      case 'both':
        return (
          containsPrefixSeparator(record.card1, prefixSeparator) ||
          containsPrefixSeparator(record.card2, prefixSeparator)
        );
      default:
        throw new Error(`Unknown card type: ${cardType}`);
    }
  });
}

export function findRecordsForListOperations(deck: AnkiRecord[], options: ListCmdOptions): ListResult {
  const { meaningSeparator, synonymSeparator, explanationBrackets, cardType, operations, prefixSeparator } = options;

  const result: ListResult = {};

  if (operations.includes('--list-cards-with-meaning-separator')) {
    result.recordsByMeaningSeparator = findRecordsBySeparator(deck, meaningSeparator, cardType);
  }
  if (operations.includes('--list-cards-with-synonym-separator')) {
    result.recordsBySynonymSeparator = findRecordsBySeparator(deck, synonymSeparator, cardType);
  }
  if (operations.includes('--list-cards-with-explanation-brackets')) {
    result.recordsByExplanationBrackets = findRecordsByExplanationBrackets(deck, explanationBrackets, cardType);
  }
  if (operations.includes('--list-cards-with-prefix-separator')) {
    result.recordsByPrefixSeparator = findRecordsByPrefixSeparator(deck, prefixSeparator!, cardType);
  }

  return result;
}

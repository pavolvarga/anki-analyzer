import { split } from 'lodash';

import { AnkiRecord } from '../../../types';
import { CompareCmdOptions, CardWrapper } from '../types';

function splitCard(wrapper: CardWrapper, meaningSeparator: string): CardWrapper {
  const splitInternal = (card: string, meaningSeparator: string): [string, string] => {
    const [card1, card2] = split(card, meaningSeparator);
    return [card1.trim(), card2.trim()];
  };

  const { card1, card2 } = wrapper;
  if (card1.includes(meaningSeparator)) {
    const [cardPartA, cardPartB] = splitInternal(card1, meaningSeparator);
    return {
      card1: cardPartA,
      card2: cardPartB,
      originalRecord: wrapper.originalRecord,
    };
  }
  return {
    card1,
    card2,
    originalRecord: wrapper.originalRecord,
  };
}

function removePrefixSeparator(wrapper: CardWrapper, prefixSeparator?: string): CardWrapper {
  const remove = (card: string, prefixSeparator?: string): string => {
    if (prefixSeparator === undefined) {
      return card.trim();
    }
    return card.replaceAll(prefixSeparator, '').trim();
  };

  if (prefixSeparator === undefined) {
    return wrapper;
  }
  return {
    card1: remove(wrapper.card1, prefixSeparator),
    card2: remove(wrapper.card2, prefixSeparator),
    originalRecord: wrapper.originalRecord,
  };
}

function removeTagMarkers(wrapper: CardWrapper, tagMarkers?: string[]): CardWrapper {
  const remove = (card: string, tagMarker: string): string => {
    if (card.includes(tagMarker)) {
      return card.replaceAll(tagMarker, '').trim();
    }
    return card;
  };

  if (tagMarkers === undefined) {
    return wrapper;
  }

  return {
    card1: tagMarkers.reduce((card: string, tagMarker: string) => remove(card, tagMarker), wrapper.card1),
    card2: tagMarkers.reduce((card: string, tagMarker: string) => remove(card, tagMarker), wrapper.card2),
    originalRecord: wrapper.originalRecord,
  };
}

function removeDuplicitMarkers(wrapper: CardWrapper, duplicitMarkers?: string[][]): CardWrapper {
  const remove = (wrapper: CardWrapper, duplicitMarker: string[]): CardWrapper => {
    return {
      card1: duplicitMarker.reduce((card: string, marker: string) => card.replaceAll(marker, '').trim(), wrapper.card1),
      card2: duplicitMarker.reduce((card: string, marker: string) => card.replaceAll(marker, '').trim(), wrapper.card2),
      originalRecord: wrapper.originalRecord,
    };
  };

  if (duplicitMarkers === undefined) {
    return wrapper;
  }

  return duplicitMarkers.reduce(
    (wrapper: CardWrapper, duplicitMarker: string[]) => remove(wrapper, duplicitMarker),
    wrapper,
  );
}

/**
 * If card1 contains multiple synonyms separated by a separator, then for each synonym create a new wrapper.
 */
function separateSynonyms(wrapper: CardWrapper, synonymSeparator: string): CardWrapper[] {
  const { card1, card2 } = wrapper;

  if (card1.includes(synonymSeparator)) {
    return card1.split(synonymSeparator).map((synonym: string) => {
      return {
        card1: synonym.trim(),
        card2: card2,
        originalRecord: wrapper.originalRecord,
      };
    });
  }
  return [wrapper];
}

export function normalizeCards(deck: AnkiRecord[], options: CompareCmdOptions): CardWrapper[] {
  const { meaningSeparator, prefixSeparator, tagMarkers, duplicitMarkers, synonymSeparator } = options;

  const convertedDeck: CardWrapper[] = deck.map((record: AnkiRecord) => {
    return {
      card1: record.card1,
      card2: record.card2,
      originalRecord: record,
    };
  });

  return convertedDeck
    .flatMap((wrapper: CardWrapper) => splitCard(wrapper, meaningSeparator))
    .flatMap((wrapper: CardWrapper) => separateSynonyms(wrapper, synonymSeparator))
    .flatMap((wrapper: CardWrapper) => removePrefixSeparator(wrapper, prefixSeparator))
    .flatMap((wrapper: CardWrapper) => removeTagMarkers(wrapper, tagMarkers))
    .flatMap((wrapper: CardWrapper) => removeDuplicitMarkers(wrapper, duplicitMarkers));
}

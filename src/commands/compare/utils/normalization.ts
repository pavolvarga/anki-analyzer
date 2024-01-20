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

export function normalizeCards(deck: AnkiRecord[], options: CompareCmdOptions): CardWrapper[] {
  const { meaningSeparator, prefixSeparator, tagMarkers } = options;

  const convertedDeck: CardWrapper[] = deck.map((record: AnkiRecord) => {
    return {
      card1: record.card1,
      card2: record.card2,
      originalRecord: record,
    };
  });

  return convertedDeck
    .map((wrapper: CardWrapper) => splitCard(wrapper, meaningSeparator))
    .map((wrapper: CardWrapper) => removePrefixSeparator(wrapper, prefixSeparator))
    .map((wrapper: CardWrapper) => removeTagMarkers(wrapper, tagMarkers));
}

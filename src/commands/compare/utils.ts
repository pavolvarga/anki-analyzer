import { split, cloneDeep } from 'lodash';
import { AnkiRecord } from '../../types';
import { CardWrapper, CompareCmdOptions, ComparisonResult } from './types';
import { CardWrapperPair } from './types';

export function removePrefixSeparator(card: string, prefixSeparator?: string): string {
  if (prefixSeparator === undefined) {
    return card.trim();
  }
  return card.replaceAll(prefixSeparator, '').trim();
}

export function filterDeck(deck: Map<string, AnkiRecord>, tag: string): AnkiRecord[] {
  return Array.from(deck.values()).filter((record: AnkiRecord) => record.tags?.includes(tag));
}

export function splitCard(card: string, meaningSeparator: string): [string, string] {
  const [card1, card2] = split(card, meaningSeparator);
  return [card1.trim(), card2.trim()];
}

export function normalizeCards(deck: AnkiRecord[], options: CompareCmdOptions): CardWrapper[] {
  const { meaningSeparator, prefixSeparator } = options;

  return deck.map((record: AnkiRecord) => {
    const { card1, card2 } = record;
    if (card1.includes(meaningSeparator)) {
      const [cardPartA, cardPartB] = splitCard(card1, meaningSeparator);
      return {
        card1: removePrefixSeparator(cardPartA, prefixSeparator),
        card2: removePrefixSeparator(cardPartB, prefixSeparator),
        originalCard1: card1,
        meainingSeparatorCar1Used: true,
        record,
      };
    }
    return {
      card1: removePrefixSeparator(card1, prefixSeparator),
      card2: removePrefixSeparator(card2, prefixSeparator),
      originalCard1: card1,
      meainingSeparatorCar1Used: false,
      record,
    };
  });
}

function extractIds(holders: CardWrapperPair[][], fieldName: string): string[] {
  // @ts-ignore
  return holders.map((holder: CardWrapperPair[]) => holder.map((holder: CardWrapperPair) => holder[fieldName])).flat();
}

export function compareCards(deckA: CardWrapper[], deckB: CardWrapper[]): ComparisonResult {
  const sameCards: CardWrapperPair[] = [];
  const differentCards: CardWrapperPair[] = [];

  deckA.forEach((cardA: CardWrapper) => {
    const cardB = deckB.find((card: CardWrapper) => card.card1 === cardA.card1);

    // both have same card1
    if (cardB) {
      if (cardA.card2 === cardB.card2) {
        sameCards.push({
          deckA: cardA,
          deckB: cardB,
          deckAId: cardA.record.id,
          deckBId: cardB.record.id,
        });
        // same card1 but different card2
      } else {
        differentCards.push({
          deckA: cardA,
          deckB: cardB,
          deckAId: cardA.record.id,
          deckBId: cardB.record.id,
        });
      }
    }
  });

  const idsFromDeckA = extractIds([sameCards, differentCards], 'deckAId');
  const idsFromDeckB = extractIds([sameCards, differentCards], 'deckBId');

  const deckAOnly = cloneDeep(deckA).filter((card: CardWrapper) => !idsFromDeckA.includes(card.record.id));
  const deckBOnly = cloneDeep(deckB).filter((card: CardWrapper) => !idsFromDeckB.includes(card.record.id));

  return {
    sameCards,
    differentCards,
    cardsOnlyInDeckA: deckAOnly,
    cardsOnlyInDeckB: deckBOnly,
  };
}

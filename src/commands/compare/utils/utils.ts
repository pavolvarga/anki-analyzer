import { cloneDeep } from 'lodash';
import { AnkiRecord } from '../../../types';
import { CardWrapper, ComparisonResult } from '../types';
import { CardWrapperPair } from '../types';

export function filterDeck(deck: Map<string, AnkiRecord>, tag: string): AnkiRecord[] {
  return Array.from(deck.values()).filter((record: AnkiRecord) => record.tags?.includes(tag));
}

function extractIds(holders: CardWrapperPair[][], fieldName: string): string[] {
  // @ts-ignore
  return holders.map((holder: CardWrapperPair[]) => holder.map((holder: CardWrapperPair) => holder[fieldName])).flat();
}

export function compareCards(deckA: CardWrapper[], deckB: CardWrapper[]): ComparisonResult {
  const sameCards: CardWrapperPair[] = [];
  const differentCards: CardWrapperPair[] = [];

  deckA.forEach((cardA: CardWrapper) => {
    const cardBs = deckB.filter((card: CardWrapper) => card.card1 === cardA.card1);

    // no duplicit cards
    if (cardBs.length === 1) {
      const cardB = cardBs[0];
      // both have same card1
      if (cardB) {
        if (cardA.card2 === cardB.card2) {
          sameCards.push({
            deckA: cardA,
            deckB: cardB,
            deckAId: cardA.originalRecord.id,
            deckBId: cardB.originalRecord.id,
          });
          // same card1 but different card2
        } else {
          differentCards.push({
            deckA: cardA,
            deckB: cardB,
            deckAId: cardA.originalRecord.id,
            deckBId: cardB.originalRecord.id,
          });
        }
      }
      // duplicit cards
    } else {
      const cardB = cardBs.find((card: CardWrapper) => card.card2 === cardA.card2);
      // same cards
      if (cardB) {
        sameCards.push({
          deckA: cardA,
          deckB: cardB,
          deckAId: cardA.originalRecord.id,
          deckBId: cardB.originalRecord.id,
        });
      }
      // ignore the else branch
      // this will result in cards which are only in deckA and in deckB and not in differentCards, because match is not possible (which one of multiple cards in deckB should be used for comparision)
    }
  });

  const idsFromDeckA = extractIds([sameCards, differentCards], 'deckAId');
  const idsFromDeckB = extractIds([sameCards, differentCards], 'deckBId');

  const deckAOnly = cloneDeep(deckA).filter((card: CardWrapper) => !idsFromDeckA.includes(card.originalRecord.id));
  const deckBOnly = cloneDeep(deckB).filter((card: CardWrapper) => !idsFromDeckB.includes(card.originalRecord.id));

  return {
    sameCards,
    differentCards,
    cardsOnlyInDeckA: deckAOnly,
    cardsOnlyInDeckB: deckBOnly,
  };
}

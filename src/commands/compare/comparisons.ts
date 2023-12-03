import { differenceWith } from 'lodash';
import { CardWrapper } from './types';

export function findPresentInGeneralButMissingInSpecific(
  generalDeck: CardWrapper[],
  specificDeck: CardWrapper[],
): CardWrapper[] {
  return differenceWith(generalDeck, specificDeck, (generalCard: CardWrapper, specificCard: CardWrapper) => {
    return generalCard.card1 === specificCard.card1;
  });
}

export function findMissingInGeneralButPresentInSpecific(
  generalDeck: CardWrapper[],
  specificDeck: CardWrapper[],
): CardWrapper[] {
  return differenceWith(specificDeck, generalDeck, (specificCard: CardWrapper, generalCard: CardWrapper) => {
    return specificCard.card1 === generalCard.card1;
  });
}

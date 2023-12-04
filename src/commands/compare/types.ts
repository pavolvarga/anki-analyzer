import { AnkiRecord } from '../../types';

/**
 * A named tuple for an anki record and card.
 * Card can be either card1 or card2 or a composition of both (using some kind of separator)
 */
export type AnkiRecordByCard = {
  card: string;
  record: AnkiRecord;
};

export type CompareCmdOptions = {
  meaningSeparator: string;
  prefixSeparator?: string;
};

export type CardWrapper = {
  card1: string;
  card2: string;
  originalCard1: string;
  meainingSeparatorCar1Used: boolean;
  record: AnkiRecord;
};

export type Holder = {
  deckA: CardWrapper;
  deckB: CardWrapper;
  deckAId: string;
  deckBId: string;
};

export type ComparisonResult = {
  sameCards: Holder[];
  differentCards: Holder[];

  cardsOnlyInDeckA: CardWrapper[];
  cardsOnlyInDeckB: CardWrapper[];
};

import { AnkiRecord } from '../../types';
import {
  OptionDuplictMarkers,
  OptionLimitRowCount,
  OptionMeaningSeparator,
  OptionOmitRowCount,
  OptionPrefixSeparator,
  OptionSynonymSeparator,
  OptionTagMarkers,
} from '../types';

export type CompareCmdOptions = OptionMeaningSeparator &
  OptionSynonymSeparator &
  Partial<OptionPrefixSeparator> &
  OptionLimitRowCount &
  OptionOmitRowCount &
  OptionTagMarkers &
  OptionDuplictMarkers & {
    comparisionTable?: 'all' | 'different' | 'only-in-general' | 'only-in-specific';
  };

/**
 * A named tuple for an anki record and card.
 * Card can be either card1 or card2 or a composition of both (using some kind of separator)
 */
export type AnkiRecordByCard = {
  card: string;
  record: AnkiRecord;
};

export type CardWrapper = {
  card1: string;
  card2: string;
  originalRecord: AnkiRecord;
};

export type CardWrapperPair = {
  deckA: CardWrapper;
  deckB: CardWrapper;
  deckAId: string;
  deckBId: string;
};

export type ComparisonResult = {
  sameCards: CardWrapperPair[];
  differentCards: CardWrapperPair[];

  cardsOnlyInDeckA: CardWrapper[];
  cardsOnlyInDeckB: CardWrapper[];
};

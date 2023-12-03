import { split } from 'lodash';
import { AnkiRecord } from '../../types';
import { CardWrapper, CompareCmdOptions } from './types';

// n!fX9	Basic (and reversed card)	Deutsch::Wörterbuch	mögen	to like, to enjoy	verb
// pU1h/@tD$O	Basic (and reversed card)	Deutsch::Verben	mögen ;; to like, to enjoy	mochte ;; hat gemocht

// "f7PKX_|#3p"	Basic (and reversed card)	Deutsch::Verben	"ab-geben ;;
// to give in, to hand in, to turn in (work)"	gab ab ;; hat abgegeben

function removePrefixSeparator(card: string, prefixSeparator?: string): string {
  if (prefixSeparator === undefined) {
    return card.trim();
  }
  return card.replace(prefixSeparator, '').trim();
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

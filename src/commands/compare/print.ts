import { sortBy } from 'lodash';
import { createLimitMsg } from '../print';
import { CardWrapper, CardWrapperPair, CompareCmdOptions, ComparisonResult } from './types';
import { sliceRecords } from '../common';

function areIdentical(result: ComparisonResult) {
  const { differentCards, cardsOnlyInDeckA, cardsOnlyInDeckB } = result;
  return differentCards.length === 0 && cardsOnlyInDeckA.length === 0 && cardsOnlyInDeckB.length === 0;
}

export function printStatus(
  deckA: string,
  deckB: string,
  tag: string,
  result: ComparisonResult,
  lengthA: number,
  lengthB: number,
  prefix: string | undefined,
) {
  const { sameCards, differentCards, cardsOnlyInDeckA, cardsOnlyInDeckB } = result;

  if (areIdentical(result)) {
    console.log(`Decks ${deckA} for tag ${tag} and ${deckB} are identical, no differences found`);
  }

  const prefixMsg = prefix ? ` (prefix used: '${prefix})'` : '';
  console.log(
    `Decks ${deckA} (${lengthA}) for tag '${tag}' and ${deckB} (${lengthB}) are not identical, differences found${prefixMsg}:`,
  );
  console.log(`  Same cards: ${sameCards.length}`);
  console.log(`  Different cards: ${differentCards.length}`);
  console.log(`  Cards only in ${deckA}: ${cardsOnlyInDeckA.length}`);
  console.log(`  Cards only in ${deckB}: ${cardsOnlyInDeckB.length}`);
}

function printDifferentTable(
  differentCards: CardWrapperPair[],
  deckAName: string,
  deckBName: string,
  options: CompareCmdOptions,
) {
  if (differentCards.length === 0) {
    console.log(`\nThere are no different cards between ${deckAName} and ${deckBName}`);
    return;
  }

  const { limitRowCount: limit, omitRowCount: omit } = options;

  console.log(`\nDifferent cards (showing ${createLimitMsg(limit, differentCards.length, omit)} records):`);

  const tableRows = sliceRecords(sortBy(differentCards, ['deckA.record.card1']), limit, omit).map((cardPair) => {
    const { deckA, deckB } = cardPair;
    return {
      'General Deck': deckAName,
      'Note Id (general)': deckA.record.id,
      'Card 1 (general)': deckA.record.card1,
      'Card 2 (general)': deckA.record.card2,

      'Specific Deck': deckBName,
      'Note Id (specific)': deckB.record.id,
      'Card 1 (specific)': deckB.record.card1,
      'Card 2 (specific)': deckB.record.card2,
    };
  });

  console.table(tableRows);
}

function printTable(header: string, cards: CardWrapper[], deckName: string, options: CompareCmdOptions) {
  if (cards.length === 0) {
    console.log(`\nDeck ${deckName} has no cards which are not part of the other deck`);
    return;
  }

  const { limitRowCount: limit, omitRowCount: omit } = options;

  console.log(header);

  const tableRows = sliceRecords(sortBy(cards, ['card.record.card1']), limit, omit).map((card) => {
    return {
      Deck: deckName,
      'Card 1': card.record.card1,
      'Card 2': card.record.card2,
    };
  });

  console.table(tableRows);
}

export function printDetails(
  result: ComparisonResult,
  options: CompareCmdOptions,
  generalDeckFullName: string,
  specificDeckFullName: string,
) {
  if (areIdentical(result)) {
    return;
  }

  const { differentCards, cardsOnlyInDeckA, cardsOnlyInDeckB } = result;

  switch (options.comparisionTable) {
    case 'different':
      printDifferentTable(differentCards, generalDeckFullName, specificDeckFullName, options);
      break;
    case 'only-in-general': {
      printTable(
        `\nCards only in ${generalDeckFullName} (showing first ${options.limitRowCount} of ${cardsOnlyInDeckA.length} records):`,
        cardsOnlyInDeckA,
        generalDeckFullName,
        options,
      );
      break;
    }
    case 'only-in-specific': {
      printTable(
        `\nCards only in ${specificDeckFullName} (showing first ${options.limitRowCount} of ${cardsOnlyInDeckB.length} records):`,
        cardsOnlyInDeckB,
        specificDeckFullName,
        options,
      );
      break;
    }
    case 'all': {
      printDifferentTable(differentCards, generalDeckFullName, specificDeckFullName, options);
      printTable(
        `\nCards only in ${generalDeckFullName} (showing first ${options.limitRowCount} of ${cardsOnlyInDeckA.length} records):`,
        cardsOnlyInDeckA,
        generalDeckFullName,
        options,
      );
      printTable(
        `\nCards only in ${specificDeckFullName} (showing first ${options.limitRowCount} of ${cardsOnlyInDeckB.length} records):`,
        cardsOnlyInDeckB,
        specificDeckFullName,
        options,
      );
      break;
    }
    default:
      throw new Error(`Unknown comparision table choice: ${options.comparisionTable}`);
  }
}

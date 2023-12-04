import { CardWrapper, CardWrapperPair, CompareCmdOptions, ComparisonResult } from './types';

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
) {
  const { sameCards, differentCards, cardsOnlyInDeckA, cardsOnlyInDeckB } = result;

  if (areIdentical(result)) {
    console.log(`Decks ${deckA} for tag ${tag} and ${deckB} are identical, no differences found`);
  }

  console.log(
    `Decks ${deckA} (${lengthA}) for tag '${tag}' and ${deckB} (${lengthB}) are not identical, differences found:`,
  );
  console.log(`  Same cards: ${sameCards.length}`);
  console.log(`  Different cards: ${differentCards.length}`);
  console.log(`  Cards only in ${deckA}: ${cardsOnlyInDeckA.length}`);
  console.log(`  Cards only in ${deckB}: ${cardsOnlyInDeckB.length}`);
}

function printDifferentTable(differentCards: CardWrapperPair[], limit: number, deckAName: string, deckBName: string) {
  if (differentCards.length === 0) {
    console.log(`\nThere are no different cards between ${deckAName} and ${deckBName}`);
    return;
  }

  console.log(`\nDifferent cards (showing first ${limit} of ${differentCards.length} records):`);

  const tableRows = differentCards.slice(0, limit).map((cardPair) => {
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

function printTable(header: string, cards: CardWrapper[], limit: number, deckName: string) {
  if (cards.length === 0) {
    console.log(`\nDeck ${deckName} has no cards which are not part of the other deck`);
    return;
  }

  console.log(header);

  const tableRows = cards.slice(0, limit).map((card) => {
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
      printDifferentTable(differentCards, options.maxRowCount, generalDeckFullName, specificDeckFullName);
      break;
    case 'only-in-general': {
      printTable(
        `\nCards only in ${generalDeckFullName} (showing first ${options.maxRowCount} of ${cardsOnlyInDeckA.length} records):`,
        cardsOnlyInDeckA,
        options.maxRowCount,
        generalDeckFullName,
      );
      break;
    }
    case 'only-in-specific': {
      printTable(
        `\nCards only in ${specificDeckFullName} (showing first ${options.maxRowCount} of ${cardsOnlyInDeckB.length} records):`,
        cardsOnlyInDeckB,
        options.maxRowCount,
        specificDeckFullName,
      );
      break;
    }
    case 'all': {
      printDifferentTable(differentCards, options.maxRowCount, generalDeckFullName, specificDeckFullName);
      printTable(
        `\nCards only in ${generalDeckFullName} (showing first ${options.maxRowCount} of ${cardsOnlyInDeckA.length} records):`,
        cardsOnlyInDeckA,
        options.maxRowCount,
        generalDeckFullName,
      );
      printTable(
        `\nCards only in ${specificDeckFullName} (showing first ${options.maxRowCount} of ${cardsOnlyInDeckB.length} records):`,
        cardsOnlyInDeckB,
        options.maxRowCount,
        specificDeckFullName,
      );
      break;
    }
    default:
      throw new Error(`Unknown comparision table choice: ${options.comparisionTable}`);
  }
}

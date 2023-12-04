import { ComparisonResult } from './types';

export function printStatus(
  deckA: string,
  deckB: string,
  tag: string,
  result: ComparisonResult,
  lengthA: number,
  lengthB: number,
) {
  const { sameCards, differentCards, cardsOnlyInDeckA, cardsOnlyInDeckB } = result;

  const identical = differentCards.length === 0 && cardsOnlyInDeckA.length === 0 && cardsOnlyInDeckB.length === 0;

  if (identical) {
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

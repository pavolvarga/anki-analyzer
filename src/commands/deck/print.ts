import { AnkiRecord, InfoTableRow } from '../../types';
import { DeckCmdOptions } from './types';
import { countTags, createIndividualTagsMap, createTagCombinations } from './utils';

export function printResult(
  table: InfoTableRow,
  options: DeckCmdOptions | undefined,
  deck: Map<string, AnkiRecord>,
): void {
  // add tags if requested and they exists
  if (options?.tags) {
    const individualTagsCount = countTags(deck, createIndividualTagsMap);
    if (Object.keys(individualTagsCount).length !== 0) {
      // @ts-ignore
      table['---------'] = '';
      table = Object.assign(table, individualTagsCount);
    }
  }

  // add tag combinations if requested and they exists
  if (options?.tagCombinations) {
    const tagCombinationsCount = countTags(deck, createTagCombinations);
    if (Object.keys(tagCombinationsCount).length !== 0) {
      // @ts-ignore
      table['-----------'] = '';
      table = Object.assign(table, tagCombinationsCount);
    }
  }

  console.table(table);
}

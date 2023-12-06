import { parse as parseFile } from '../../fileParser/fileParser';
import { parse as parseOptions } from './optionsParser';
import { analyzeDeck, convertOneAnalysis, findDeck } from '../common';
import { countTags, createIndividualTagsMap, createTagCombinations } from './utils';

export function commandDeck(file: string, inputDeckName: string, cmdOptions: any): void {
  const records = parseFile(file);
  const options = parseOptions(cmdOptions);
  const [name, deck] = findDeck(inputDeckName, records);

  const analysis = analyzeDeck(deck, name, options);
  let table = convertOneAnalysis(analysis, options);

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

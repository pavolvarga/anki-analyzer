import { AnkiRecord } from '../../types';
import { createTagMapFn, TagCount } from './types';

export function createIndividualTagsMap(deck: Map<string, AnkiRecord>): Map<string, number> {
  return Array.from(deck.values()).reduce((acc, current) => {
    (current.tags ?? []).forEach((tag: string) => {
      if (acc.has(tag)) {
        acc.set(tag, acc.get(tag)! + 1);
      } else {
        acc.set(tag, 1);
      }
    });
    return acc;
  }, new Map<string, number>());
}

export function createTagCombinations(deck: Map<string, AnkiRecord>): Map<string, number> {
  return Array.from(deck.values()).reduce((acc, current) => {
    if ((current.tags ?? []).length === 0) {
      return acc;
    }
    const combination = current.tags!.join(', ');
    if (acc.has(combination)) {
      acc.set(combination, acc.get(combination)! + 1);
    } else {
      acc.set(combination, 1);
    }
    return acc;
  }, new Map<string, number>());
}

export function countTags(deck: Map<string, AnkiRecord>, createTagMap: createTagMapFn) {
  const arr = Array.from(createTagMap(deck).entries()).reduce((acc, entry) => {
    acc.push({ tag: entry[0], count: entry[1] });
    return acc;
  }, [] as TagCount[]);
  const sorted = arr.sort((a, b) => a.count - b.count).reverse();

  return sorted.reduce((acc, current) => {
    // @ts-ignore
    acc[current.tag] = current.count;
    return acc;
  }, {});
}

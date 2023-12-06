import { AnkiRecord } from '../../types';
import { InfoCmdOptions } from '../info/types';

export type DeckCmdOptions = InfoCmdOptions & {
  countTags: boolean;
  countTagCombinations: boolean;
};

export type TagCount = {
  tag: string;
  count: number;
};

// eslint-disable-next-line no-unused-vars
export type createTagMapFn = (d: Map<string, AnkiRecord>) => Map<string, number>;

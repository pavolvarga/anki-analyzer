import { AnkiRecord } from '../../types';
import { CmdOptions } from '../info/types';

export type InfoCmdOptions = CmdOptions & {
  tags: boolean;
  tagCombinations: boolean;
};

export type TagCount = {
  tag: string;
  count: number;
};

// eslint-disable-next-line no-unused-vars
export type createTagMapFn = (d: Map<string, AnkiRecord>) => Map<string, number>;

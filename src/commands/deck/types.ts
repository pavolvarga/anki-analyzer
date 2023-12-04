import { AnkiRecord } from '../../types';
import { ExplanationBracketType } from '../../types';

export type InfoCmdOptions = {
  meaningSeparator?: string;
  synonymSeparator?: string;
  explanationBracket?: ExplanationBracketType;
  tags: boolean;
  tagCombinations: boolean;
};

export type TagCount = {
  tag: string;
  count: number;
};

// eslint-disable-next-line no-unused-vars
export type createTagMapFn = (d: Map<string, AnkiRecord>) => Map<string, number>;

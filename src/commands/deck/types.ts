import { CmdOptions } from '../types';

export type InfoCmdOptions = CmdOptions & {
  tags: boolean;
};

export type IndividualTags = {
  [k: string]: number;
};

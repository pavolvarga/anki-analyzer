import { CardType } from '../../types';

export type DuplicateCmdOptions = {
  synonymSeparator: string;
  tags?: string[];
  cardType?: CardType;
  maxRowCount: number;
};

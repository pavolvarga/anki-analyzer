import { CardType } from '../../types';
import { OptionLimitRowCount } from '../types';

export type DuplicateCmdOptions = OptionLimitRowCount & {
  synonymSeparator: string;
  tags?: string[];
  cardType?: CardType;
};

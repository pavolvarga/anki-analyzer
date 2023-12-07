import { OptionCardType, OptionLimitRowCount, OptionOmitRowCount, OptionSynonymSeparator, OptionTags } from '../types';

export type DuplicatesCmdOptions = OptionSynonymSeparator &
  OptionLimitRowCount &
  OptionTags &
  Partial<OptionCardType> &
  OptionOmitRowCount;

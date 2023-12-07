import { OptionCardType, OptionLimitRowCount, OptionSynonymSeparator, OptionTags } from '../types';

export type DuplicateCmdOptions = OptionSynonymSeparator & OptionLimitRowCount & OptionTags & Partial<OptionCardType>;

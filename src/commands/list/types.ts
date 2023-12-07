import { AnkiRecord } from '../../types';
import {
  OptionCardType,
  OptionExplanationBracketOption,
  OptionLimitRowCount,
  OptionMeaningSeparator,
  OptionOmitRowCount,
  OptionPrefixSeparator,
  OptionSynonymSeparator,
  OptionTags,
} from '../types';

export type ListCmdOptions = OptionMeaningSeparator &
  OptionSynonymSeparator &
  OptionExplanationBracketOption &
  Partial<OptionPrefixSeparator> &
  OptionLimitRowCount &
  OptionTags &
  OptionCardType &
  OptionOmitRowCount & {
    operations: ListOperation[];
  };

export type ListOperation =
  | '--list-cards-with-meaning-separator'
  | '--list-cards-with-synonym-separator'
  | '--list-cards-with-explanation-brackets'
  | '--list-cards-with-prefix-separator';

export type ListResult = {
  recordsByMeaningSeparator?: AnkiRecord[];
  recordsBySynonymSeparator?: AnkiRecord[];
  recordsByExplanationBrackets?: AnkiRecord[];
  recordsByPrefixSeparator?: AnkiRecord[];
};

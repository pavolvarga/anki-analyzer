import { AnkiRecord } from '../../types';
import {
  OptionCardType,
  OptionExplanationBracketOption,
  OptionLimitRowCount,
  OptionMeaningSeparator,
  OptionSynonymSeparator,
  OptionTags,
} from '../types';

export type ListCmdOptions = OptionMeaningSeparator &
  OptionSynonymSeparator &
  OptionExplanationBracketOption &
  OptionLimitRowCount &
  OptionTags &
  OptionCardType & {
    operations: ListOperation[];
  };

export type ListOperation =
  | '--list-cards-with-meaning-separator'
  | '--list-cards-with-synonym-separator'
  | '--list-cards-with-explanation-brackets';

export type ListResult = {
  recordsByMeaningSeparator?: AnkiRecord[];
  recordsBySynonymSeparator?: AnkiRecord[];
  recordsByExplanationBrackets?: AnkiRecord[];
};

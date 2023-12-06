import { AnkiRecord, CardType, ExplanationBracketType } from '../../types';
import { OptionLimitRowCount } from '../types';

export type ListOperation =
  | '--list-cards-with-meaning-separator'
  | '--list-cards-with-synonym-separator'
  | '--list-cards-with-explanation-brackets';

export type ListCmdOptions = OptionLimitRowCount & {
  meaningSeparator: string;
  synonymSeparator: string;
  explanationBrackets: ExplanationBracketType;
  tags?: string[];
  cardType: CardType;
  operations: ListOperation[];
};

export type ListResult = {
  recordsByMeaningSeparator?: AnkiRecord[];
  recordsBySynonymSeparator?: AnkiRecord[];
  recordsByExplanationBrackets?: AnkiRecord[];
};

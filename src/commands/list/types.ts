import { CardType, ExplanationBracketType } from '../../types';

export type ListOperation =
  | '--list-cards-with-meaning-separator'
  | '--list-cards-with-synonym-separator'
  | '--list-cards-with-explanation-brackets';

export type ListCmdOptions = {
  meaningSeparator: string;
  synonymSeparator: string;
  explanationBrackets: ExplanationBracketType;
  tags?: string[];
  cardType: CardType;
  maxRowCount: number;
  operations: ListOperation[];
};

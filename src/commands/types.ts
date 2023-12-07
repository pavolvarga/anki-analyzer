// Command options which are used in multiple commands.

import { CardType, ExplanationBracketType } from '../types';

/**
 * Separator additional information (plural, past tense, etc.)
 */
export type OptionMeaningSeparator = {
  meaningSeparator: string;
};

/**
 * Separator for synonyms.
 */
export type OptionSynonymSeparator = {
  synonymSeparator: string;
};

/**
 * Explanation brackets for additional info attached to a card.
 */
export type OptionExplanationBracketOption = {
  explanationBrackets: ExplanationBracketType;
};

/**
 * Prefix / Suffix separator.
 */
export type OptionPrefixSeparator = {
  prefixSeparator: string;
};

/**
 * Limit the rows shown in an output table.
 */
export type OptionLimitRowCount = {
  limitRowCount: number;
};

/**
 * List of tags for command / operation.
 * It is used to narrow down the records to be processed.
 */
export type OptionTags = {
  tags?: string[];
};

/**
 * Use the command / operation for card1, card2 or both.
 */
export type OptionCardType = {
  cardType: CardType;
};

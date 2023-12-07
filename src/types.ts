export type AnkiRecord = {
  id: string;
  deckType: string;
  deckName: string;
  card1: string;
  card2: string;
  tags?: string[];
};

export type AnkiRecordContainer = {
  all: Map<string, AnkiRecord>;
  byDeck: Map<string, Map<string, AnkiRecord>>;
};

export type InfoTableRow = {
  Name: string;
  Notes: number;
  Cards: number;
  'Same Note Type': 'yes' | 'no' | '';
  'Notes with Tags': number;

  // optional

  'Cards with Meaning Separator'?: number;
  'Cards with Synonym separator'?: number;
  'Cards with Explanation'?: number;
  'Cards with Prefix Separator'?: number;
};

export type CardType = 'card1' | 'card2' | 'both';
export type ExplanationBracketType = 'round' | 'square' | 'curly';

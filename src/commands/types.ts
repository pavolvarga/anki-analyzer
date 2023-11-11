export type DeckAnalysis = {
  //
  // mandatory analysis
  //

  // name of deck
  name: string;

  // true if all cards in a Deck use the same note type
  sameNoteType: boolean;

  // reverse note is counted twice
  cardCount: number;

  // one note can be one card (Basic type) or two (Basic and Reversed type)
  noteCount: number;

  // how many notes in a deck have tags
  tagsCount: number;

  //
  // optional analysis if user has used optional options
  //

  // count of cards which use the meaning separator
  cardsWithMeaningSeparator?: number;

  // count of cards which use synonym separator
  cardsWithSynonymSeparator?: number;
};

export type TableRow = {
  Name: string;
  Notes: number;
  Cards: number;
  'Same Note Type': 'yes' | 'no' | '';
  'Notes with Tags': number;

  // optional

  'Cards with Meaning Separator'?: number;
  'Cards with Synonym separator'?: number;
};

export type InfoCmdOptions = {
  meaningSeparator?: string;
  synonymSeparator?: string;
};

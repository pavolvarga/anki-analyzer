export type DeckAnalysis = {
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
};

export type TableRow = {
  Name: string;
  Notes: number;
  Cards: number;
  'Same Note Type': 'yes' | 'no' | '';
};

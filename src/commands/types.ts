export type DeckAnalysis = {
  // true if all cards in a Deck use the same note type
  sameNoteType: boolean;

  // reverse note is counted twice
  cardCount: number;
};

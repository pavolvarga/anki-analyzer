/* eslint-disable-next-line */
type Record = {
  id: string;
  deckType: string;
  deckName: string;
  card1: string;
  card2: string;
  tags?: string[];
};

export type AnkiMetadata = {
  separator: string;
  usedHtml: boolean;
  guidColumnPosition: number;
  notetypeColumnPosition: number;
  deckColumnPosition: number;
  tagsColumnPosition: number;
};

export type ParsedAnkiFile = {
  metadata: string[];
  cards: string[];
};

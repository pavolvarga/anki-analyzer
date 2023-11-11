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

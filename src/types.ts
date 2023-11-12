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

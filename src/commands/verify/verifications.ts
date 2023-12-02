import { AnkiRecord } from '../../types';

export function verifyTagsUsed(deckName: string, deck: Map<string, AnkiRecord>) {
  const withoutTags = Array.from(deck.values()).filter(
    (record) => record.tags === undefined || record.tags.length === 0,
  );

  if (withoutTags.length === 0) {
    console.info(`Deck ${deckName} passed --verify-tags-used verfication. All records have tags.`);
    return;
  }

  console.info(`Deck ${deckName} failed --verify-tags-used verfication. ${withoutTags.length} records have no tags:`);
  withoutTags.forEach((record) => console.info(`\t} ${record}`));
}

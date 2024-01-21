import { CardWrapper, CardWrapperPair } from '../types';
import { compareCards } from './utils';

describe('compareCards', () => {
  describe('when no duplicit cards are present', () => {
    it('should return only same cards list if cards are same in both decks', () => {
      const deckA: CardWrapper[] = [
        {
          card1: 'abarbeiten',
          card2: 'to work sth. off (debt)',
          originalRecord: {
            id: '}PX28',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abarbeiten',
            card2: 'to work sth. off (debt)',
          },
        },
        {
          card1: 'abbauen',
          card2: 'to dismantle, to mine',
          originalRecord: {
            id: 'n$r,B',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abbauen',
            card2: 'to dismantle, to mine',
          },
        },
        {
          card1: 'abbeißen',
          card2: 'to bite sth. off',
          originalRecord: {
            id: '8vel2',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abbeißen',
            card2: 'to bite sth. off',
          },
        },
        {
          card1: 'abbekommen',
          card2: "to get one's share",
          originalRecord: {
            id: '-i8b1',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abbekommen',
            card2: "to get one's share",
          },
        },
        {
          card1: 'abbestellen',
          card2: 'to unsubscribe',
          originalRecord: {
            id: '034^N',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abbestellen',
            card2: 'to unsubscribe',
          },
        },
      ];
      const deckB: CardWrapper[] = [
        {
          card1: 'abarbeiten',
          card2: 'to work sth. off (debt)',
          originalRecord: {
            id: 'K{7]C',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'ab-arbeiten ;; to work sth. off (debt)',
            card2: 'arbeitete ab ;; hat abgearbeitet',
          },
        },
        {
          card1: 'abbauen',
          card2: 'to dismantle, to mine',
          originalRecord: {
            id: '9?:xE',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'ab-bauen ;; to dismantle, to mine',
            card2: 'bauete ab ;; hat abgebaut',
          },
        },
        {
          card1: 'abbeißen',
          card2: 'to bite sth. off',
          originalRecord: {
            id: 'H&J6Q',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'ab-beißen ;; to bite sth. off',
            card2: 'biss ab ;; hat abgebissen',
          },
        },
        {
          card1: 'abbekommen',
          card2: "to get one's share",
          originalRecord: {
            id: 'Ms@<8',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: "ab-bekommen ;; to get one's share",
            card2: 'bekam ab ;; hat abbekommen',
          },
        },
        {
          card1: 'abbestellen',
          card2: 'to unsubscribe',
          originalRecord: {
            id: 'oj!b7',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'ab-bestellen ;; to unsubscribe',
            card2: 'bestellte ab ;; hat abbestellt',
          },
        },
      ];

      const result = compareCards(deckA, deckB);
      const { cardsOnlyInDeckA, cardsOnlyInDeckB, differentCards, sameCards } = result;

      const expectedSameCards: CardWrapperPair[] = [
        {
          deckA: {
            card1: 'abarbeiten',
            card2: 'to work sth. off (debt)',
            originalRecord: {
              id: '}PX28',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abarbeiten',
              card2: 'to work sth. off (debt)',
            },
          },
          deckB: {
            card1: 'abarbeiten',
            card2: 'to work sth. off (debt)',
            originalRecord: {
              id: 'K{7]C',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'ab-arbeiten ;; to work sth. off (debt)',
              card2: 'arbeitete ab ;; hat abgearbeitet',
            },
          },
          deckAId: '}PX28',
          deckBId: 'K{7]C',
        },
        {
          deckA: {
            card1: 'abbauen',
            card2: 'to dismantle, to mine',
            originalRecord: {
              id: 'n$r,B',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abbauen',
              card2: 'to dismantle, to mine',
            },
          },
          deckB: {
            card1: 'abbauen',
            card2: 'to dismantle, to mine',
            originalRecord: {
              id: '9?:xE',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'ab-bauen ;; to dismantle, to mine',
              card2: 'bauete ab ;; hat abgebaut',
            },
          },
          deckAId: 'n$r,B',
          deckBId: '9?:xE',
        },
        {
          deckA: {
            card1: 'abbeißen',
            card2: 'to bite sth. off',
            originalRecord: {
              id: '8vel2',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abbeißen',
              card2: 'to bite sth. off',
            },
          },
          deckB: {
            card1: 'abbeißen',
            card2: 'to bite sth. off',
            originalRecord: {
              id: 'H&J6Q',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'ab-beißen ;; to bite sth. off',
              card2: 'biss ab ;; hat abgebissen',
            },
          },
          deckAId: '8vel2',
          deckBId: 'H&J6Q',
        },
        {
          deckA: {
            card1: 'abbekommen',
            card2: "to get one's share",
            originalRecord: {
              id: '-i8b1',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abbekommen',
              card2: "to get one's share",
            },
          },
          deckB: {
            card1: 'abbekommen',
            card2: "to get one's share",
            originalRecord: {
              id: 'Ms@<8',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: "ab-bekommen ;; to get one's share",
              card2: 'bekam ab ;; hat abbekommen',
            },
          },
          deckAId: '-i8b1',
          deckBId: 'Ms@<8',
        },
        {
          deckA: {
            card1: 'abbestellen',
            card2: 'to unsubscribe',
            originalRecord: {
              id: '034^N',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abbestellen',
              card2: 'to unsubscribe',
            },
          },
          deckB: {
            card1: 'abbestellen',
            card2: 'to unsubscribe',
            originalRecord: {
              id: 'oj!b7',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'ab-bestellen ;; to unsubscribe',
              card2: 'bestellte ab ;; hat abbestellt',
            },
          },
          deckAId: '034^N',
          deckBId: 'oj!b7',
        },
      ];

      expect(cardsOnlyInDeckA).toStrictEqual([]);
      expect(cardsOnlyInDeckB).toStrictEqual([]);
      expect(differentCards).toStrictEqual([]);
      expect(sameCards).toStrictEqual(expectedSameCards);
    });
    it('should find different cards if card2 is different', () => {
      const deckA: CardWrapper[] = [
        {
          card1: 'abarbeiten',
          card2: 'to work sth. off (debt)',
          originalRecord: {
            id: '}PX28',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abarbeiten',
            card2: 'to work sth. off (debt)',
          },
        },
        {
          card1: 'abbauen',
          card2: 'to dismantle, to mine',
          originalRecord: {
            id: 'n$r,B',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abbauen',
            card2: 'to dismantle, to mine',
          },
        },
        {
          card1: 'abbeißen',
          card2: 'to bite sth. off',
          originalRecord: {
            id: '8vel2',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abbeißen',
            card2: 'to bite sth. off',
          },
        },
        {
          card1: 'abbekommen',
          card2: "to get one's share",
          originalRecord: {
            id: '-i8b1',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abbekommen',
            card2: "to get one's share",
          },
        },
        {
          card1: 'abbestellen',
          card2: 'to unsubscribe',
          originalRecord: {
            id: '034^N',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abbestellen',
            card2: 'to unsubscribe',
          },
        },
      ];
      const deckB: CardWrapper[] = [
        {
          card1: 'abarbeiten',
          card2: 'to work sth. off',
          originalRecord: {
            id: 'K{7]C',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'ab-arbeiten ;; to work sth. off (debt)',
            card2: 'arbeitete ab ;; hat abgearbeitet',
          },
        },
        {
          card1: 'abbauen',
          card2: 'to dismantle, to mine',
          originalRecord: {
            id: '9?:xE',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'ab-bauen ;; to dismantle, to mine',
            card2: 'bauete ab ;; hat abgebaut',
          },
        },
        {
          card1: 'abbeißen',
          card2: 'to bite sth. off',
          originalRecord: {
            id: 'H&J6Q',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'ab-beißen ;; to bite sth. off',
            card2: 'biss ab ;; hat abgebissen',
          },
        },
        {
          card1: 'abbekommen',
          card2: "to get one's share",
          originalRecord: {
            id: 'Ms@<8',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: "ab-bekommen ;; to get one's share",
            card2: 'bekam ab ;; hat abbekommen',
          },
        },
        {
          card1: 'abbestellen',
          card2: 'to unsubscribe',
          originalRecord: {
            id: 'oj!b7',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'ab-bestellen ;; to unsubscribe',
            card2: 'bestellte ab ;; hat abbestellt',
          },
        },
      ];

      const result = compareCards(deckA, deckB);
      const { cardsOnlyInDeckA, cardsOnlyInDeckB, differentCards, sameCards } = result;

      const expectedDifferentCards: CardWrapperPair[] = [
        {
          deckA: {
            card1: 'abarbeiten',
            card2: 'to work sth. off (debt)',
            originalRecord: {
              id: '}PX28',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abarbeiten',
              card2: 'to work sth. off (debt)',
            },
          },
          deckB: {
            card1: 'abarbeiten',
            card2: 'to work sth. off',
            originalRecord: {
              id: 'K{7]C',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'ab-arbeiten ;; to work sth. off (debt)',
              card2: 'arbeitete ab ;; hat abgearbeitet',
            },
          },
          deckAId: '}PX28',
          deckBId: 'K{7]C',
        },
      ];
      const expectedSameCards: CardWrapperPair[] = [
        {
          deckA: {
            card1: 'abbauen',
            card2: 'to dismantle, to mine',
            originalRecord: {
              id: 'n$r,B',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abbauen',
              card2: 'to dismantle, to mine',
            },
          },
          deckB: {
            card1: 'abbauen',
            card2: 'to dismantle, to mine',
            originalRecord: {
              id: '9?:xE',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'ab-bauen ;; to dismantle, to mine',
              card2: 'bauete ab ;; hat abgebaut',
            },
          },
          deckAId: 'n$r,B',
          deckBId: '9?:xE',
        },
        {
          deckA: {
            card1: 'abbeißen',
            card2: 'to bite sth. off',
            originalRecord: {
              id: '8vel2',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abbeißen',
              card2: 'to bite sth. off',
            },
          },
          deckB: {
            card1: 'abbeißen',
            card2: 'to bite sth. off',
            originalRecord: {
              id: 'H&J6Q',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'ab-beißen ;; to bite sth. off',
              card2: 'biss ab ;; hat abgebissen',
            },
          },
          deckAId: '8vel2',
          deckBId: 'H&J6Q',
        },
        {
          deckA: {
            card1: 'abbekommen',
            card2: "to get one's share",
            originalRecord: {
              id: '-i8b1',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abbekommen',
              card2: "to get one's share",
            },
          },
          deckB: {
            card1: 'abbekommen',
            card2: "to get one's share",
            originalRecord: {
              id: 'Ms@<8',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: "ab-bekommen ;; to get one's share",
              card2: 'bekam ab ;; hat abbekommen',
            },
          },
          deckAId: '-i8b1',
          deckBId: 'Ms@<8',
        },
        {
          deckA: {
            card1: 'abbestellen',
            card2: 'to unsubscribe',
            originalRecord: {
              id: '034^N',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abbestellen',
              card2: 'to unsubscribe',
            },
          },
          deckB: {
            card1: 'abbestellen',
            card2: 'to unsubscribe',
            originalRecord: {
              id: 'oj!b7',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'ab-bestellen ;; to unsubscribe',
              card2: 'bestellte ab ;; hat abbestellt',
            },
          },
          deckAId: '034^N',
          deckBId: 'oj!b7',
        },
      ];

      expect(cardsOnlyInDeckA).toStrictEqual([]);
      expect(cardsOnlyInDeckB).toStrictEqual([]);
      expect(differentCards).toStrictEqual(expectedDifferentCards);
      expect(sameCards).toStrictEqual(expectedSameCards);
    });
    it('should find cards which are only in deckA, if such exists', () => {
      const deckA: CardWrapper[] = [
        {
          card1: 'abarbeiten',
          card2: 'to work sth. off (debt)',
          originalRecord: {
            id: '}PX28',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abarbeiten',
            card2: 'to work sth. off (debt)',
          },
        },
        {
          card1: 'abbauen',
          card2: 'to dismantle, to mine',
          originalRecord: {
            id: 'n$r,B',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abbauen',
            card2: 'to dismantle, to mine',
          },
        },
        {
          card1: 'abbeißen',
          card2: 'to bite sth. off',
          originalRecord: {
            id: '8vel2',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abbeißen',
            card2: 'to bite sth. off',
          },
        },
        {
          card1: 'abbekommen',
          card2: "to get one's share",
          originalRecord: {
            id: '-i8b1',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abbekommen',
            card2: "to get one's share",
          },
        },
        {
          card1: 'abbestellen',
          card2: 'to unsubscribe',
          originalRecord: {
            id: '034^N',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abbestellen',
            card2: 'to unsubscribe',
          },
        },
      ];
      const deckB: CardWrapper[] = [
        {
          card1: 'abbauen',
          card2: 'to dismantle, to mine',
          originalRecord: {
            id: '9?:xE',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'ab-bauen ;; to dismantle, to mine',
            card2: 'bauete ab ;; hat abgebaut',
          },
        },
        {
          card1: 'abbeißen',
          card2: 'to bite sth. off',
          originalRecord: {
            id: 'H&J6Q',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'ab-beißen ;; to bite sth. off',
            card2: 'biss ab ;; hat abgebissen',
          },
        },
        {
          card1: 'abbekommen',
          card2: "to get one's share",
          originalRecord: {
            id: 'Ms@<8',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: "ab-bekommen ;; to get one's share",
            card2: 'bekam ab ;; hat abbekommen',
          },
        },
        {
          card1: 'abbestellen',
          card2: 'to unsubscribe',
          originalRecord: {
            id: 'oj!b7',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'ab-bestellen ;; to unsubscribe',
            card2: 'bestellte ab ;; hat abbestellt',
          },
        },
      ];

      const result = compareCards(deckA, deckB);
      const { cardsOnlyInDeckA, cardsOnlyInDeckB, differentCards, sameCards } = result;

      const expectedCardsOnlyInDeckA: CardWrapper[] = [
        {
          card1: 'abarbeiten',
          card2: 'to work sth. off (debt)',
          originalRecord: {
            id: '}PX28',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abarbeiten',
            card2: 'to work sth. off (debt)',
          },
        },
      ];
      const expectedSameCards: CardWrapperPair[] = [
        {
          deckA: {
            card1: 'abbauen',
            card2: 'to dismantle, to mine',
            originalRecord: {
              id: 'n$r,B',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abbauen',
              card2: 'to dismantle, to mine',
            },
          },
          deckB: {
            card1: 'abbauen',
            card2: 'to dismantle, to mine',
            originalRecord: {
              id: '9?:xE',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'ab-bauen ;; to dismantle, to mine',
              card2: 'bauete ab ;; hat abgebaut',
            },
          },
          deckAId: 'n$r,B',
          deckBId: '9?:xE',
        },
        {
          deckA: {
            card1: 'abbeißen',
            card2: 'to bite sth. off',
            originalRecord: {
              id: '8vel2',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abbeißen',
              card2: 'to bite sth. off',
            },
          },
          deckB: {
            card1: 'abbeißen',
            card2: 'to bite sth. off',
            originalRecord: {
              id: 'H&J6Q',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'ab-beißen ;; to bite sth. off',
              card2: 'biss ab ;; hat abgebissen',
            },
          },
          deckAId: '8vel2',
          deckBId: 'H&J6Q',
        },
        {
          deckA: {
            card1: 'abbekommen',
            card2: "to get one's share",
            originalRecord: {
              id: '-i8b1',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abbekommen',
              card2: "to get one's share",
            },
          },
          deckB: {
            card1: 'abbekommen',
            card2: "to get one's share",
            originalRecord: {
              id: 'Ms@<8',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: "ab-bekommen ;; to get one's share",
              card2: 'bekam ab ;; hat abbekommen',
            },
          },
          deckAId: '-i8b1',
          deckBId: 'Ms@<8',
        },
        {
          deckA: {
            card1: 'abbestellen',
            card2: 'to unsubscribe',
            originalRecord: {
              id: '034^N',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abbestellen',
              card2: 'to unsubscribe',
            },
          },
          deckB: {
            card1: 'abbestellen',
            card2: 'to unsubscribe',
            originalRecord: {
              id: 'oj!b7',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'ab-bestellen ;; to unsubscribe',
              card2: 'bestellte ab ;; hat abbestellt',
            },
          },
          deckAId: '034^N',
          deckBId: 'oj!b7',
        },
      ];

      expect(cardsOnlyInDeckA).toStrictEqual(expectedCardsOnlyInDeckA);
      expect(cardsOnlyInDeckB).toStrictEqual([]);
      expect(differentCards).toStrictEqual([]);
      expect(sameCards).toStrictEqual(expectedSameCards);
    });
    it('should find cards which are only in deckB, if such exists', () => {
      const deckA: CardWrapper[] = [
        {
          card1: 'abbauen',
          card2: 'to dismantle, to mine',
          originalRecord: {
            id: 'n$r,B',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abbauen',
            card2: 'to dismantle, to mine',
          },
        },
        {
          card1: 'abbeißen',
          card2: 'to bite sth. off',
          originalRecord: {
            id: '8vel2',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abbeißen',
            card2: 'to bite sth. off',
          },
        },
        {
          card1: 'abbekommen',
          card2: "to get one's share",
          originalRecord: {
            id: '-i8b1',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abbekommen',
            card2: "to get one's share",
          },
        },
        {
          card1: 'abbestellen',
          card2: 'to unsubscribe',
          originalRecord: {
            id: '034^N',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'abbestellen',
            card2: 'to unsubscribe',
          },
        },
      ];
      const deckB: CardWrapper[] = [
        {
          card1: 'abarbeiten',
          card2: 'to work sth. off (debt)',
          originalRecord: {
            id: 'K{7]C',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'ab-arbeiten ;; to work sth. off (debt)',
            card2: 'arbeitete ab ;; hat abgearbeitet',
          },
        },
        {
          card1: 'abbauen',
          card2: 'to dismantle, to mine',
          originalRecord: {
            id: '9?:xE',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'ab-bauen ;; to dismantle, to mine',
            card2: 'bauete ab ;; hat abgebaut',
          },
        },
        {
          card1: 'abbeißen',
          card2: 'to bite sth. off',
          originalRecord: {
            id: 'H&J6Q',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'ab-beißen ;; to bite sth. off',
            card2: 'biss ab ;; hat abgebissen',
          },
        },
        {
          card1: 'abbekommen',
          card2: "to get one's share",
          originalRecord: {
            id: 'Ms@<8',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: "ab-bekommen ;; to get one's share",
            card2: 'bekam ab ;; hat abbekommen',
          },
        },
        {
          card1: 'abbestellen',
          card2: 'to unsubscribe',
          originalRecord: {
            id: 'oj!b7',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'ab-bestellen ;; to unsubscribe',
            card2: 'bestellte ab ;; hat abbestellt',
          },
        },
      ];

      const result = compareCards(deckA, deckB);
      const { cardsOnlyInDeckA, cardsOnlyInDeckB, differentCards, sameCards } = result;

      const expectedDifferentCards = [
        {
          card1: 'abarbeiten',
          card2: 'to work sth. off (debt)',
          originalRecord: {
            id: 'K{7]C',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'ab-arbeiten ;; to work sth. off (debt)',
            card2: 'arbeitete ab ;; hat abgearbeitet',
          },
        },
      ];
      const expectedSameCards: CardWrapperPair[] = [
        {
          deckA: {
            card1: 'abbauen',
            card2: 'to dismantle, to mine',
            originalRecord: {
              id: 'n$r,B',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abbauen',
              card2: 'to dismantle, to mine',
            },
          },
          deckB: {
            card1: 'abbauen',
            card2: 'to dismantle, to mine',
            originalRecord: {
              id: '9?:xE',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'ab-bauen ;; to dismantle, to mine',
              card2: 'bauete ab ;; hat abgebaut',
            },
          },
          deckAId: 'n$r,B',
          deckBId: '9?:xE',
        },
        {
          deckA: {
            card1: 'abbeißen',
            card2: 'to bite sth. off',
            originalRecord: {
              id: '8vel2',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abbeißen',
              card2: 'to bite sth. off',
            },
          },
          deckB: {
            card1: 'abbeißen',
            card2: 'to bite sth. off',
            originalRecord: {
              id: 'H&J6Q',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'ab-beißen ;; to bite sth. off',
              card2: 'biss ab ;; hat abgebissen',
            },
          },
          deckAId: '8vel2',
          deckBId: 'H&J6Q',
        },
        {
          deckA: {
            card1: 'abbekommen',
            card2: "to get one's share",
            originalRecord: {
              id: '-i8b1',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abbekommen',
              card2: "to get one's share",
            },
          },
          deckB: {
            card1: 'abbekommen',
            card2: "to get one's share",
            originalRecord: {
              id: 'Ms@<8',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: "ab-bekommen ;; to get one's share",
              card2: 'bekam ab ;; hat abbekommen',
            },
          },
          deckAId: '-i8b1',
          deckBId: 'Ms@<8',
        },
        {
          deckA: {
            card1: 'abbestellen',
            card2: 'to unsubscribe',
            originalRecord: {
              id: '034^N',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'abbestellen',
              card2: 'to unsubscribe',
            },
          },
          deckB: {
            card1: 'abbestellen',
            card2: 'to unsubscribe',
            originalRecord: {
              id: 'oj!b7',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'ab-bestellen ;; to unsubscribe',
              card2: 'bestellte ab ;; hat abbestellt',
            },
          },
          deckAId: '034^N',
          deckBId: 'oj!b7',
        },
      ];

      expect(cardsOnlyInDeckA).toStrictEqual([]);
      expect(cardsOnlyInDeckB).toStrictEqual(expectedDifferentCards);
      expect(differentCards).toStrictEqual([]);
      expect(sameCards).toStrictEqual(expectedSameCards);
    });
  });
  describe('when duplicit cards are present', () => {
    it('should return only same cards list if cards are same in both decks', () => {
      const deckA: CardWrapper[] = [
        {
          card1: 'durchbrechen',
          card2: 'to breach',
          originalRecord: {
            id: 'uCPOO',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'durchbrechen (untrennbar)',
            card2: 'to breach',
          },
        },
        {
          card1: 'durchbrechen',
          card2: 'to break sth. in half',
          originalRecord: {
            id: 'XEY5R',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'durchbrechen (trennbar)',
            card2: 'to break sth. in half',
          },
        },
        {
          card1: 'durchdenken',
          card2: 'to think through, to reason out',
          originalRecord: {
            id: ')hBX9',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'durchdenken (trennbar)',
            card2: 'to think through, to reason out',
          },
        },
        {
          card1: 'durchdenken',
          card2: 'to deliberate',
          originalRecord: {
            id: 'f=!z6',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'durchdenken (untrennbar)',
            card2: 'to deliberate',
          },
        },
      ];
      const deckB: CardWrapper[] = [
        {
          card1: 'durchbrechen',
          card2: 'to breach',
          originalRecord: {
            id: '8!Gi4',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'durchbrechen ;; to breach',
            card2: 'durchbrach ;; hat durchbrochen',
          },
        },
        {
          card1: 'durchbrechen',
          card2: 'to break sth. in half',
          originalRecord: {
            id: '.um`J',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'durch-brechen ;; to break sth. in half',
            card2: 'brach durch ;; hat durchgebrochen',
          },
        },
        {
          card1: 'durchdenken',
          card2: 'to think through, to reason out',
          originalRecord: {
            id: 'W;7pI',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'durch-denken ;; to think through, to reason out',
            card2: 'dachte durch ;; hat durchgedacht',
          },
        },
        {
          card1: 'durchdenken',
          card2: 'to deliberate',
          originalRecord: {
            id: 'S43TM',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'durchdenken ;; to deliberate',
            card2: 'durchdachte ;; hat durchdacht',
          },
        },
      ];

      const result = compareCards(deckA, deckB);
      const { cardsOnlyInDeckA, cardsOnlyInDeckB, differentCards, sameCards } = result;

      const expectedSameCards: CardWrapperPair[] = [
        {
          deckA: {
            card1: 'durchbrechen',
            card2: 'to breach',
            originalRecord: {
              id: 'uCPOO',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'durchbrechen (untrennbar)',
              card2: 'to breach',
            },
          },
          deckB: {
            card1: 'durchbrechen',
            card2: 'to breach',
            originalRecord: {
              id: '8!Gi4',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'durchbrechen ;; to breach',
              card2: 'durchbrach ;; hat durchbrochen',
            },
          },
          deckAId: 'uCPOO',
          deckBId: '8!Gi4',
        },
        {
          deckA: {
            card1: 'durchbrechen',
            card2: 'to break sth. in half',
            originalRecord: {
              id: 'XEY5R',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'durchbrechen (trennbar)',
              card2: 'to break sth. in half',
            },
          },
          deckB: {
            card1: 'durchbrechen',
            card2: 'to break sth. in half',
            originalRecord: {
              id: '.um`J',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'durch-brechen ;; to break sth. in half',
              card2: 'brach durch ;; hat durchgebrochen',
            },
          },
          deckAId: 'XEY5R',
          deckBId: '.um`J',
        },
        {
          deckA: {
            card1: 'durchdenken',
            card2: 'to think through, to reason out',
            originalRecord: {
              id: ')hBX9',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'durchdenken (trennbar)',
              card2: 'to think through, to reason out',
            },
          },
          deckB: {
            card1: 'durchdenken',
            card2: 'to think through, to reason out',
            originalRecord: {
              id: 'W;7pI',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'durch-denken ;; to think through, to reason out',
              card2: 'dachte durch ;; hat durchgedacht',
            },
          },
          deckAId: ')hBX9',
          deckBId: 'W;7pI',
        },
        {
          deckA: {
            card1: 'durchdenken',
            card2: 'to deliberate',
            originalRecord: {
              id: 'f=!z6',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'durchdenken (untrennbar)',
              card2: 'to deliberate',
            },
          },
          deckB: {
            card1: 'durchdenken',
            card2: 'to deliberate',
            originalRecord: {
              id: 'S43TM',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'durchdenken ;; to deliberate',
              card2: 'durchdachte ;; hat durchdacht',
            },
          },
          deckAId: 'f=!z6',
          deckBId: 'S43TM',
        },
      ];

      expect(cardsOnlyInDeckA).toStrictEqual([]);
      expect(cardsOnlyInDeckB).toStrictEqual([]);
      expect(differentCards).toStrictEqual([]);
      expect(sameCards).toStrictEqual(expectedSameCards);
    });
    it('should handle case when match between deckA and deckB cards is not possible', () => {
      const deckA: CardWrapper[] = [
        {
          card1: 'durchbrechen',
          card2: 'to breach',
          originalRecord: {
            id: 'uCPOO',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'durchbrechen (untrennbar)',
            card2: 'to breach',
          },
        },
        {
          card1: 'durchbrechen',
          card2: 'to break sth. in half',
          originalRecord: {
            id: 'XEY5R',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'durchbrechen (trennbar)',
            card2: 'to break sth. in half',
          },
        },
        {
          card1: 'durchdenken',
          card2: 'to think through, to reason out',
          originalRecord: {
            id: ')hBX9',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'durchdenken (trennbar)',
            card2: 'to think through, to reason out',
          },
        },
        {
          card1: 'durchdenken',
          card2: 'to deliberate',
          originalRecord: {
            id: 'f=!z6',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'durchdenken (untrennbar)',
            card2: 'to deliberate',
          },
        },
      ];
      const deckB: CardWrapper[] = [
        {
          card1: 'durchbrechen',
          card2: 'to breachch',
          originalRecord: {
            id: '8!Gi4',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'durchbrechen ;; to breach',
            card2: 'durchbrach ;; hat durchbrochen',
          },
        },
        {
          card1: 'durchbrechen',
          card2: 'to break sth. in half',
          originalRecord: {
            id: '.um`J',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'durch-brechen ;; to break sth. in half',
            card2: 'brach durch ;; hat durchgebrochen',
          },
        },
        {
          card1: 'durchdenken',
          card2: 'to think through, to reason out',
          originalRecord: {
            id: 'W;7pI',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'durch-denken ;; to think through, to reason out',
            card2: 'dachte durch ;; hat durchgedacht',
          },
        },
        {
          card1: 'durchdenken',
          card2: 'to deliberate',
          originalRecord: {
            id: 'S43TM',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'durchdenken ;; to deliberate',
            card2: 'durchdachte ;; hat durchdacht',
          },
        },
      ];

      const result = compareCards(deckA, deckB);
      const { cardsOnlyInDeckA, cardsOnlyInDeckB, differentCards, sameCards } = result;

      const expectedCardsOnlyInDeckA: CardWrapper[] = [
        {
          card1: 'durchbrechen',
          card2: 'to breach',
          originalRecord: {
            id: 'uCPOO',
            deckName: 'Deutsch::Wörterbuch',
            deckType: 'Basic (and reversed card)',
            tags: ['verb'],
            card1: 'durchbrechen (untrennbar)',
            card2: 'to breach',
          },
        },
      ];
      const expectedCardsOnlyInDeckB: CardWrapper[] = [
        {
          card1: 'durchbrechen',
          card2: 'to breachch',
          originalRecord: {
            id: '8!Gi4',
            deckName: 'Deutsch::Verben',
            deckType: 'Basic (and reversed card)',
            tags: undefined,
            card1: 'durchbrechen ;; to breach',
            card2: 'durchbrach ;; hat durchbrochen',
          },
        },
      ];
      const expectedSameCards: CardWrapperPair[] = [
        {
          deckA: {
            card1: 'durchbrechen',
            card2: 'to break sth. in half',
            originalRecord: {
              id: 'XEY5R',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'durchbrechen (trennbar)',
              card2: 'to break sth. in half',
            },
          },
          deckB: {
            card1: 'durchbrechen',
            card2: 'to break sth. in half',
            originalRecord: {
              id: '.um`J',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'durch-brechen ;; to break sth. in half',
              card2: 'brach durch ;; hat durchgebrochen',
            },
          },
          deckAId: 'XEY5R',
          deckBId: '.um`J',
        },
        {
          deckA: {
            card1: 'durchdenken',
            card2: 'to think through, to reason out',
            originalRecord: {
              id: ')hBX9',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'durchdenken (trennbar)',
              card2: 'to think through, to reason out',
            },
          },
          deckB: {
            card1: 'durchdenken',
            card2: 'to think through, to reason out',
            originalRecord: {
              id: 'W;7pI',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'durch-denken ;; to think through, to reason out',
              card2: 'dachte durch ;; hat durchgedacht',
            },
          },
          deckAId: ')hBX9',
          deckBId: 'W;7pI',
        },
        {
          deckA: {
            card1: 'durchdenken',
            card2: 'to deliberate',
            originalRecord: {
              id: 'f=!z6',
              deckName: 'Deutsch::Wörterbuch',
              deckType: 'Basic (and reversed card)',
              tags: ['verb'],
              card1: 'durchdenken (untrennbar)',
              card2: 'to deliberate',
            },
          },
          deckB: {
            card1: 'durchdenken',
            card2: 'to deliberate',
            originalRecord: {
              id: 'S43TM',
              deckName: 'Deutsch::Verben',
              deckType: 'Basic (and reversed card)',
              tags: undefined,
              card1: 'durchdenken ;; to deliberate',
              card2: 'durchdachte ;; hat durchdacht',
            },
          },
          deckAId: 'f=!z6',
          deckBId: 'S43TM',
        },
      ];

      expect(cardsOnlyInDeckA).toStrictEqual(expectedCardsOnlyInDeckA);
      expect(cardsOnlyInDeckB).toStrictEqual(expectedCardsOnlyInDeckB);
      expect(differentCards).toStrictEqual([]);
      expect(sameCards).toStrictEqual(expectedSameCards);
    });
  });
});

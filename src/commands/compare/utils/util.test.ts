import { CardWrapper, CardWrapperPair } from '../types';
import { compareCards } from './utils';

describe('compareCards', () => {
  describe('when no duplicit markers are used', () => {
    it('should return only same cards list if cards are same in both decks', () => {
      const deckA: CardWrapper[] = [
        {
          card1: 'abarbeiten',
          card2: 'to work sth. off (debt)',
          originalCard1: 'abarbeiten',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'abbauen',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'abbeißen',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'abbekommen',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'abbestellen',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'ab-arbeiten ;; to work sth. off (debt)',
          meainingSeparatorCar1Used: true,
          record: {
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
          originalCard1: 'ab-bauen ;; to dismantle, to mine',
          meainingSeparatorCar1Used: true,
          record: {
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
          originalCard1: 'ab-beißen ;; to bite sth. off',
          meainingSeparatorCar1Used: true,
          record: {
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
          originalCard1: "ab-bekommen ;; to get one's share",
          meainingSeparatorCar1Used: true,
          record: {
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
          originalCard1: 'ab-bestellen ;; to unsubscribe',
          meainingSeparatorCar1Used: true,
          record: {
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
            originalCard1: 'abarbeiten',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: 'ab-arbeiten ;; to work sth. off (debt)',
            meainingSeparatorCar1Used: true,
            record: {
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
            originalCard1: 'abbauen',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: 'ab-bauen ;; to dismantle, to mine',
            meainingSeparatorCar1Used: true,
            record: {
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
            originalCard1: 'abbeißen',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: 'ab-beißen ;; to bite sth. off',
            meainingSeparatorCar1Used: true,
            record: {
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
            originalCard1: 'abbekommen',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: "ab-bekommen ;; to get one's share",
            meainingSeparatorCar1Used: true,
            record: {
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
            originalCard1: 'abbestellen',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: 'ab-bestellen ;; to unsubscribe',
            meainingSeparatorCar1Used: true,
            record: {
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
          originalCard1: 'abarbeiten',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'abbauen',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'abbeißen',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'abbekommen',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'abbestellen',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'ab-arbeiten ;; to work sth. off (debt)',
          meainingSeparatorCar1Used: true,
          record: {
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
          originalCard1: 'ab-bauen ;; to dismantle, to mine',
          meainingSeparatorCar1Used: true,
          record: {
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
          originalCard1: 'ab-beißen ;; to bite sth. off',
          meainingSeparatorCar1Used: true,
          record: {
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
          originalCard1: "ab-bekommen ;; to get one's share",
          meainingSeparatorCar1Used: true,
          record: {
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
          originalCard1: 'ab-bestellen ;; to unsubscribe',
          meainingSeparatorCar1Used: true,
          record: {
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
            originalCard1: 'abarbeiten',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: 'ab-arbeiten ;; to work sth. off (debt)',
            meainingSeparatorCar1Used: true,
            record: {
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
            originalCard1: 'abbauen',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: 'ab-bauen ;; to dismantle, to mine',
            meainingSeparatorCar1Used: true,
            record: {
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
            originalCard1: 'abbeißen',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: 'ab-beißen ;; to bite sth. off',
            meainingSeparatorCar1Used: true,
            record: {
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
            originalCard1: 'abbekommen',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: "ab-bekommen ;; to get one's share",
            meainingSeparatorCar1Used: true,
            record: {
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
            originalCard1: 'abbestellen',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: 'ab-bestellen ;; to unsubscribe',
            meainingSeparatorCar1Used: true,
            record: {
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
          originalCard1: 'abarbeiten',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'abbauen',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'abbeißen',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'abbekommen',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'abbestellen',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'ab-bauen ;; to dismantle, to mine',
          meainingSeparatorCar1Used: true,
          record: {
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
          originalCard1: 'ab-beißen ;; to bite sth. off',
          meainingSeparatorCar1Used: true,
          record: {
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
          originalCard1: "ab-bekommen ;; to get one's share",
          meainingSeparatorCar1Used: true,
          record: {
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
          originalCard1: 'ab-bestellen ;; to unsubscribe',
          meainingSeparatorCar1Used: true,
          record: {
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
          originalCard1: 'abarbeiten',
          meainingSeparatorCar1Used: false,
          record: {
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
            originalCard1: 'abbauen',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: 'ab-bauen ;; to dismantle, to mine',
            meainingSeparatorCar1Used: true,
            record: {
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
            originalCard1: 'abbeißen',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: 'ab-beißen ;; to bite sth. off',
            meainingSeparatorCar1Used: true,
            record: {
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
            originalCard1: 'abbekommen',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: "ab-bekommen ;; to get one's share",
            meainingSeparatorCar1Used: true,
            record: {
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
            originalCard1: 'abbestellen',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: 'ab-bestellen ;; to unsubscribe',
            meainingSeparatorCar1Used: true,
            record: {
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
          originalCard1: 'abbauen',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'abbeißen',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'abbekommen',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'abbestellen',
          meainingSeparatorCar1Used: false,
          record: {
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
          originalCard1: 'ab-arbeiten ;; to work sth. off (debt)',
          meainingSeparatorCar1Used: true,
          record: {
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
          originalCard1: 'ab-bauen ;; to dismantle, to mine',
          meainingSeparatorCar1Used: true,
          record: {
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
          originalCard1: 'ab-beißen ;; to bite sth. off',
          meainingSeparatorCar1Used: true,
          record: {
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
          originalCard1: "ab-bekommen ;; to get one's share",
          meainingSeparatorCar1Used: true,
          record: {
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
          originalCard1: 'ab-bestellen ;; to unsubscribe',
          meainingSeparatorCar1Used: true,
          record: {
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
          originalCard1: 'ab-arbeiten ;; to work sth. off (debt)',
          meainingSeparatorCar1Used: true,
          record: {
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
            originalCard1: 'abbauen',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: 'ab-bauen ;; to dismantle, to mine',
            meainingSeparatorCar1Used: true,
            record: {
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
            originalCard1: 'abbeißen',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: 'ab-beißen ;; to bite sth. off',
            meainingSeparatorCar1Used: true,
            record: {
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
            originalCard1: 'abbekommen',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: "ab-bekommen ;; to get one's share",
            meainingSeparatorCar1Used: true,
            record: {
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
            originalCard1: 'abbestellen',
            meainingSeparatorCar1Used: false,
            record: {
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
            originalCard1: 'ab-bestellen ;; to unsubscribe',
            meainingSeparatorCar1Used: true,
            record: {
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
});

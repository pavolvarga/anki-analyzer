import { AnkiRecord } from '../../../types';
import { CompareCmdOptions } from '../types';
import { normalizeCards } from './normalization';

describe('normalizeCards', () => {
  const options: CompareCmdOptions = {
    meaningSeparator: ';;',
    prefixSeparator: '-',
    limitRowCount: 10,
  };

  it('should correctly normalize cards 01', () => {
    const deck: AnkiRecord[] = [
      {
        id: 'yocZF',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        tags: ['verb'],
        card1: 'verstehen',
        card2: 'to understand',
      },
      {
        id: '4]~YM',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        tags: ['verb'],
        card1: 'teilnehmen',
        card2: 'to participate',
      },
      {
        id: 'qga&S',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        tags: ['verb'],
        card1: 'feiern',
        card2: 'to celebrate',
      },
      {
        id: 'B,i{S',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        tags: ['verb'],
        card1: 'zeigen',
        card2: 'to display sth.',
      },
      {
        id: 'Ep$qA',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        tags: ['verb'],
        card1: 'schenken',
        card2: 'to give a present',
      },
    ];

    const result = normalizeCards(deck, options);
    const expected = [
      {
        card1: 'verstehen',
        card2: 'to understand',
        originalRecord: {
          id: 'yocZF',
          deckName: 'Deutsch::Wörterbuch',
          deckType: 'Basic (and reversed card)',
          tags: ['verb'],
          card1: 'verstehen',
          card2: 'to understand',
        },
      },
      {
        card1: 'teilnehmen',
        card2: 'to participate',
        originalRecord: {
          id: '4]~YM',
          deckName: 'Deutsch::Wörterbuch',
          deckType: 'Basic (and reversed card)',
          tags: ['verb'],
          card1: 'teilnehmen',
          card2: 'to participate',
        },
      },
      {
        card1: 'feiern',
        card2: 'to celebrate',
        originalRecord: {
          id: 'qga&S',
          deckName: 'Deutsch::Wörterbuch',
          deckType: 'Basic (and reversed card)',
          tags: ['verb'],
          card1: 'feiern',
          card2: 'to celebrate',
        },
      },
      {
        card1: 'zeigen',
        card2: 'to display sth.',
        originalRecord: {
          id: 'B,i{S',
          deckName: 'Deutsch::Wörterbuch',
          deckType: 'Basic (and reversed card)',
          tags: ['verb'],
          card1: 'zeigen',
          card2: 'to display sth.',
        },
      },
      {
        card1: 'schenken',
        card2: 'to give a present',
        originalRecord: {
          id: 'Ep$qA',
          deckName: 'Deutsch::Wörterbuch',
          deckType: 'Basic (and reversed card)',
          tags: ['verb'],
          card1: 'schenken',
          card2: 'to give a present',
        },
      },
    ];

    expect(result).toStrictEqual(expected);
  });
  it('should correctly normalize cards 02', () => {
    const deck: AnkiRecord[] = [
      {
        id: 'C@Z6!|}hjH',
        deckName: 'Deutsch::Verben',
        deckType: 'Basic (and reversed card)',
        tags: undefined,
        card1: 'ab-fahren ;; to leave, to depart',
        card2: 'fuhr ab ;; ist abgefahren',
      },
      {
        id: '"Qu~#*4$6#n"',
        deckName: 'Deutsch::Verben',
        deckType: 'Basic (and reversed card)',
        tags: undefined,
        card1: 'ab-fliegen ;; to take off, to fly away',
        card2: 'flog ab ;; ist abgeflogen',
      },
      {
        id: '"f7PKX_|#3p"',
        deckName: 'Deutsch::Verben',
        deckType: 'Basic (and reversed card)',
        tags: undefined,
        card1: 'ab-geben ;; to hand in, to turn in (work)',
        card2: 'gab ab ;; hat abgegeben',
      },
      {
        id: 'i6*sudL7ey',
        deckName: 'Deutsch::Verben',
        deckType: 'Basic (and reversed card)',
        tags: undefined,
        card1: 'an-fangen ;; to start',
        card2: 'fing an ;; hat angefangen',
      },
      {
        id: 'c_sU?l4T!x',
        deckName: 'Deutsch::Verben',
        deckType: 'Basic (and reversed card)',
        tags: undefined,
        card1: 'an-kommen ;; to come',
        card2: 'kam an ;; ist angekommen',
      },
    ];

    const result = normalizeCards(deck, options);
    const expected = [
      {
        card1: 'abfahren',
        card2: 'to leave, to depart',
        originalRecord: {
          id: 'C@Z6!|}hjH',
          deckName: 'Deutsch::Verben',
          deckType: 'Basic (and reversed card)',
          tags: undefined,
          card1: 'ab-fahren ;; to leave, to depart',
          card2: 'fuhr ab ;; ist abgefahren',
        },
      },
      {
        card1: 'abfliegen',
        card2: 'to take off, to fly away',
        originalRecord: {
          id: '"Qu~#*4$6#n"',
          deckName: 'Deutsch::Verben',
          deckType: 'Basic (and reversed card)',
          tags: undefined,
          card1: 'ab-fliegen ;; to take off, to fly away',
          card2: 'flog ab ;; ist abgeflogen',
        },
      },
      {
        card1: 'abgeben',
        card2: 'to hand in, to turn in (work)',
        originalRecord: {
          id: '"f7PKX_|#3p"',
          deckName: 'Deutsch::Verben',
          deckType: 'Basic (and reversed card)',
          tags: undefined,
          card1: 'ab-geben ;; to hand in, to turn in (work)',
          card2: 'gab ab ;; hat abgegeben',
        },
      },
      {
        card1: 'anfangen',
        card2: 'to start',
        originalRecord: {
          id: 'i6*sudL7ey',
          deckName: 'Deutsch::Verben',
          deckType: 'Basic (and reversed card)',
          tags: undefined,
          card1: 'an-fangen ;; to start',
          card2: 'fing an ;; hat angefangen',
        },
      },
      {
        card1: 'ankommen',
        card2: 'to come',
        originalRecord: {
          id: 'c_sU?l4T!x',
          deckName: 'Deutsch::Verben',
          deckType: 'Basic (and reversed card)',
          tags: undefined,
          card1: 'an-kommen ;; to come',
          card2: 'kam an ;; ist angekommen',
        },
      },
    ];

    expect(result).toStrictEqual(expected);
  });
});

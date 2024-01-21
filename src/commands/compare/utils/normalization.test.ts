import { AnkiRecord } from '../../../types';
import { CompareCmdOptions } from '../types';
import { normalizeCards } from './normalization';

describe('normalizeCards', () => {
  it('should correctly normalize cards 01', () => {
    const options: CompareCmdOptions = {
      meaningSeparator: ';;',
      prefixSeparator: '-',
      limitRowCount: 10,
    };
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
    const options: CompareCmdOptions = {
      meaningSeparator: ';;',
      prefixSeparator: '-',
      limitRowCount: 10,
    };
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

  it('should correctly normalize cards 03', () => {
    const options: CompareCmdOptions = {
      meaningSeparator: ';;',
      prefixSeparator: '-',
      limitRowCount: 10,
      tagMarkers: ['(verb)'],
    };
    const deck: AnkiRecord[] = [
      {
        id: '$6*.7',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        tags: ['verb'],
        card1: 'vergeben (verb)',
        card2: 'to forgive',
      },
      {
        id: '>>KxN',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        tags: ['verb'],
        card1: 'betreten (verb)',
        card2: 'to set foot on sth.',
      },
      {
        id: 'qpGZ5N?Use',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        tags: ['verb'],
        card1: 'erfahren (verb)',
        card2: 'to be informed',
      },
      {
        id: 'vDSaE',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        tags: ['verb'],
        card1: 'verlegen (verb)',
        card2: 'to reschedule sth.',
      },
      {
        id: 'Zz;8P',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        tags: ['verb'],
        card1: 'befahren (verb)',
        card2: 'to cruise, to drive along',
      },
      {
        id: '$FS2E',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        tags: ['verb'],
        card1: 'begeben (verb)',
        card2: 'to issue sth. (stock)',
      },
      {
        id: '&otJV',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        tags: ['verb'],
        card1: 'bescheiden (verb)',
        card2: 'to decide upon sth.',
      },
    ];

    const result = normalizeCards(deck, options);
    const expected = [
      {
        card1: 'vergeben',
        card2: 'to forgive',
        originalRecord: {
          id: '$6*.7',
          deckName: 'Deutsch::Wörterbuch',
          deckType: 'Basic (and reversed card)',
          tags: ['verb'],
          card1: 'vergeben (verb)',
          card2: 'to forgive',
        },
      },
      {
        card1: 'betreten',
        card2: 'to set foot on sth.',
        originalRecord: {
          id: '>>KxN',
          deckName: 'Deutsch::Wörterbuch',
          deckType: 'Basic (and reversed card)',
          tags: ['verb'],
          card1: 'betreten (verb)',
          card2: 'to set foot on sth.',
        },
      },
      {
        card1: 'erfahren',
        card2: 'to be informed',
        originalRecord: {
          id: 'qpGZ5N?Use',
          deckName: 'Deutsch::Wörterbuch',
          deckType: 'Basic (and reversed card)',
          tags: ['verb'],
          card1: 'erfahren (verb)',
          card2: 'to be informed',
        },
      },
      {
        card1: 'verlegen',
        card2: 'to reschedule sth.',
        originalRecord: {
          id: 'vDSaE',
          deckName: 'Deutsch::Wörterbuch',
          deckType: 'Basic (and reversed card)',
          tags: ['verb'],
          card1: 'verlegen (verb)',
          card2: 'to reschedule sth.',
        },
      },
      {
        card1: 'befahren',
        card2: 'to cruise, to drive along',
        originalRecord: {
          id: 'Zz;8P',
          deckName: 'Deutsch::Wörterbuch',
          deckType: 'Basic (and reversed card)',
          tags: ['verb'],
          card1: 'befahren (verb)',
          card2: 'to cruise, to drive along',
        },
      },
      {
        card1: 'begeben',
        card2: 'to issue sth. (stock)',
        originalRecord: {
          id: '$FS2E',
          deckName: 'Deutsch::Wörterbuch',
          deckType: 'Basic (and reversed card)',
          tags: ['verb'],
          card1: 'begeben (verb)',
          card2: 'to issue sth. (stock)',
        },
      },
      {
        card1: 'bescheiden',
        card2: 'to decide upon sth.',
        originalRecord: {
          id: '&otJV',
          deckName: 'Deutsch::Wörterbuch',
          deckType: 'Basic (and reversed card)',
          tags: ['verb'],
          card1: 'bescheiden (verb)',
          card2: 'to decide upon sth.',
        },
      },
    ];

    expect(result).toStrictEqual(expected);
  });

  it('should correctly normalize cards 04', () => {
    const options: CompareCmdOptions = {
      meaningSeparator: ';;',
      prefixSeparator: '-',
      limitRowCount: 10,
      duplicitMarkers: [
        ['(trennbar)', '(untrennbar)'],
        ['(weak)', '(strong)'],
      ],
    };
    const deck: AnkiRecord[] = [
      {
        id: 'uCPOO',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        tags: ['verb'],
        card1: 'durchbrechen (untrennbar)',
        card2: 'to breach',
      },
      {
        id: 'XEY5R',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        tags: ['verb'],
        card1: 'durchbrechen (trennbar)',
        card2: 'to break sth. in half',
      },
      {
        id: '8g.|O',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        tags: ['verb'],
        card1: 'durchfallen (untrennbar)',
        card2: 'to fall through',
      },
      {
        id: 'aqwDG',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        tags: ['verb'],
        card1: 'durchfallen (trennbar)',
        card2: 'to fail the topic',
      },
    ];

    const result = normalizeCards(deck, options);
    const expected = [
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
        card1: 'durchfallen',
        card2: 'to fall through',
        originalRecord: {
          id: '8g.|O',
          deckName: 'Deutsch::Wörterbuch',
          deckType: 'Basic (and reversed card)',
          tags: ['verb'],
          card1: 'durchfallen (untrennbar)',
          card2: 'to fall through',
        },
      },
      {
        card1: 'durchfallen',
        card2: 'to fail the topic',
        originalRecord: {
          id: 'aqwDG',
          deckName: 'Deutsch::Wörterbuch',
          deckType: 'Basic (and reversed card)',
          tags: ['verb'],
          card1: 'durchfallen (trennbar)',
          card2: 'to fail the topic',
        },
      },
    ];

    expect(result).toStrictEqual(expected);
  });
});

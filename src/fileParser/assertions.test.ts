import { assertRecords } from './assertions';

describe('assertRecords', () => {
  it('should throw an error if HTML is used in card1', () => {
    const record = {
      id: 'wA8fq[nZ!+',
      deckName: 'Deutsch::Wörterbuch',
      deckType: 'Basic (and reversed card)',
      card1: '<span style="color: rgb(32, 32, 32); background-color: rgb(253, 253, 250);">gebären</span>',
      card2: 'to give birth',
    };
    const records = [record];

    expect(() => {
      assertRecords(records);
      // eslint-disable-next-line
    }).toThrow('HTML is used in record \'wA8fq[nZ!+\' either in card1, card2 or both');
  });
  it('should throw an error if HTML is used in card2', () => {
    const record = {
      id: 'k4!U^:Ji&V',
      deckName: 'Deutsch::Declination Nomen',
      deckType: 'Basic',
      card1: 'Nominativ ;; Definitiv Artikel ;; gut ;; Mann',
      card2: '<font color="#ff5500">der</font> gut<font color="#ff5500">e</font> Mann',
    };
    const records = [record];

    expect(() => {
      assertRecords(records);
      // eslint-disable-next-line
    }).toThrow('HTML is used in record \'k4!U^:Ji&V\' either in card1, card2 or both');
  });
  it('should throw an error if HTML is used in card1 and card2', () => {
    const record = {
      id: 'AA',
      deckName: 'Deutsch::Declination Nomen',
      deckType: 'Basic',
      card1: '<span style="color: rgb(32, 32, 32); background-color: rgb(253, 253, 250);">gebären</span>',
      card2: '<font color="#ff5500">der</font> gut<font color="#ff5500">e</font> Mann',
    };
    const records = [record];

    expect(() => {
      assertRecords(records);
      // eslint-disable-next-line
    }).toThrow('HTML is used in record \'AA\' either in card1, card2 or both');
  });
  it('should not throw an error if HTML is not used in card1 and card2', () => {
    const record = {
      id: 'LoV=N_TL4',
      deckName: 'Deutsch::Wörterbuch',
      deckType: 'Basic (and reversed card)',
      card1: 'saugen',
      card2: 'to suck, to suckle',
    };
    const records = [record];

    expect(() => {
      assertRecords(records);
    }).not.toThrow();
  });
});

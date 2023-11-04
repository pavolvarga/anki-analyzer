import { parseRecords } from './recordParser';
import { AnkiMetadata } from './types';

describe('parseRecords', () => {
  const metadata: AnkiMetadata = {
    separator: '\t',
    usedHtml: true,
    guidColumnPosition: 1,
    notetypeColumnPosition: 2,
    deckColumnPosition: 3,
    tagsColumnPosition: 6,
  };

  describe('single line records', () => {
    it('should parse a single line record', () => {
      const input = ['5n>M6	Basic (and reversed card)	Deutsch::Wörterbuch	die Mahlzeit	the meal	noun'];
      const result = parseRecords(input, metadata);

      expect(result.length).toStrictEqual(1);
      expect(result[0]).toStrictEqual({
        id: '5n>M6',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        card1: 'die Mahlzeit',
        card2: 'the meal',
        tags: ['noun'],
      });
    });
    it('should parse a single line record when ontly the id column contains quotes', () => {
      const input = ['"bB$#T"	Basic (and reversed card)	Deutsch::Verben	tauen ;; to thaw	taute ;; ist getaut	'];
      const result = parseRecords(input, metadata);
      expect(result.length).toStrictEqual(1);
      expect(result[0]).toStrictEqual({
        id: '"bB$#T"',
        deckName: 'Deutsch::Verben',
        deckType: 'Basic (and reversed card)',
        card1: 'tauen ;; to thaw',
        card2: 'taute ;; ist getaut',
        tags: undefined,
      });
    });
    it('should parse single line record containing html', () => {
      const input = [
        '"BM+/vZBAa;"	Basic	Deutsch::Konjunktionen, Subjunktionen, Konjunktionaladverbien	dass ;; that	"<i>Subjunktion +&nbsp;</i><i>Subjekt +&nbsp;… + finites Verb ;;<br></i><span style=""color: rgb(32, 32, 32); background-color: rgb(253, 253, 255);"">Sie macht Urlaub an der Nordsee,&nbsp;</span><span style=""color: rgb(32, 32, 32); background-color: rgb(253, 253, 255); text-decoration-line: underline;"">dass</span><span style=""color: rgb(32, 32, 32); background-color: rgb(253, 253, 255);"">&nbsp;</span><i>sie</i><span style=""color: rgb(32, 32, 32); background-color: rgb(253, 253, 255);"">&nbsp;das Meer&nbsp;</span><i>liebt</i><span style=""color: rgb(32, 32, 32); background-color: rgb(253, 253, 255);"">.</span><i><br></i>"	',
      ];
      const result = parseRecords(input, metadata);
      expect(result.length).toStrictEqual(1);
      expect(result[0]).toStrictEqual({
        id: '"BM+/vZBAa;"',
        deckName: 'Deutsch::Konjunktionen, Subjunktionen, Konjunktionaladverbien',
        deckType: 'Basic',
        card1: 'dass ;; that',
        card2:
          '"<i>Subjunktion +&nbsp;</i><i>Subjekt +&nbsp;… + finites Verb ;;<br></i><span style=""color: rgb(32, 32, 32); background-color: rgb(253, 253, 255);"">Sie macht Urlaub an der Nordsee,&nbsp;</span><span style=""color: rgb(32, 32, 32); background-color: rgb(253, 253, 255); text-decoration-line: underline;"">dass</span><span style=""color: rgb(32, 32, 32); background-color: rgb(253, 253, 255);"">&nbsp;</span><i>sie</i><span style=""color: rgb(32, 32, 32); background-color: rgb(253, 253, 255);"">&nbsp;das Meer&nbsp;</span><i>liebt</i><span style=""color: rgb(32, 32, 32); background-color: rgb(253, 253, 255);"">.</span><i><br></i>"',
        tags: undefined,
      });
    });
  });

  describe('multi line records', () => {
    it('should parse a multiline line record when the card1 is split into several lines', () => {
      const input = [
        'UBN+T	Basic (and reversed card)	Deutsch::Wörterbuch	"die Brieftasche, ',
        'die Geldtasche, ',
        'die Geldbörse,',
        'der Geldbeutel,',
        'das Portemonnaie"	the wallet	noun',
      ];

      const result = parseRecords(input, metadata);

      expect(result.length).toStrictEqual(1);
      expect(result[0]).toStrictEqual({
        id: 'UBN+T',
        deckName: 'Deutsch::Wörterbuch',
        deckType: 'Basic (and reversed card)',
        card1: '"die Brieftasche,die Geldtasche,die Geldbörse,der Geldbeutel,das Portemonnaie"',
        card2: 'the wallet',
        tags: ['noun'],
      });
    });
    it('should parse a multiline line record when both the card1 and card2 are split into several lines', () => {
      const input = [
        'wn4)D	Basic (and reversed card)	Deutsch::Verben	"dazwischen-kommen ;; ',
        'to interfere, to intervene"	"kam dazwischen ;; ',
        'ist dazwischengekommen"',
      ];

      const result = parseRecords(input, metadata);

      expect(result.length).toStrictEqual(1);
      expect(result[0]).toStrictEqual({
        id: 'wn4)D',
        deckName: 'Deutsch::Verben',
        deckType: 'Basic (and reversed card)',
        card1: '"dazwischen-kommen ;; to interfere,to intervene"',
        card2: '"kam dazwischen ;; ist dazwischengekommen"',
        tags: undefined,
      });
    });
  });

  // describe('multile lines containing both single and multi line records', () => {

  // });
});

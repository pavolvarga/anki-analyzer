import { onlyIdColumnContainsQuotes, mergeMultilineRecord, parseRecords } from './recordParser';
import { AnkiMetadata } from './types';

describe('mergeMultilineRecord', () => {
  it('should merge splitted record into single string', () => {
    const input = [
      'UBN+T\tBasic (and reversed card)	Deutsch::Wörterbuch	"die Brieftasche, ',
      'die Geldtasche, ',
      'die Geldbörse, ',
      'der Geldbeutel, ',
      'das Portemonnaie"\tthe wallet\tnoun  ',
    ];
    const expected =
      'UBN+T\tBasic (and reversed card)	Deutsch::Wörterbuch	die Brieftasche, die Geldtasche, die Geldbörse, der Geldbeutel, das Portemonnaie\tthe wallet\tnoun  ';
    const result = mergeMultilineRecord(input);
    expect(result).toStrictEqual(expected);
  });
});

describe('onlyIdColumnContainsQuotes', () => {
  it('should return true if only ID column contains `"`', () => {
    const line = '"bB$#T"	Basic (and reversed card)	Deutsch::Verben	tauen ;; to thaw	taute ;; ist getaut	';
    const result = onlyIdColumnContainsQuotes(line);
    expect(result).toStrictEqual(true);
  });
  it('should return false if other columns than ID also contain `"`', () => {
    const line = '"bB$#T"	Basic (and reversed card)	Deutsch::Verben	tauen ;; "to thaw"	taute ;; ist getaut	';
    const result = onlyIdColumnContainsQuotes(line);
    expect(result).toStrictEqual(false);
  });
});

describe('parseRecords', () => {
  const metadata: AnkiMetadata = {
    separator: '\t',
    usedHtml: true,
    guidColumnPosition: 1,
    notetypeColumnPosition: 2,
    deckColumnPosition: 3,
    tagsColumnPosition: 6,
  };

  it('should parse a single line records', () => {
    const input = [
      '5n>M6	Basic (and reversed card)	Deutsch::Wörterbuch	die Mahlzeit	the meal	noun',
      '(-/T	Basic (and reversed card)	Deutsch::Wörterbuch	die Zeit	the time	noun',
    ];
    const result = parseRecords(input, metadata);

    expect(result.length).toStrictEqual(2);
    expect(result[0]).toStrictEqual({
      id: '5n>M6',
      deckName: 'Deutsch::Wörterbuch',
      deckType: 'Basic (and reversed card)',
      card1: 'die Mahlzeit',
      card2: 'the meal',
      tags: ['noun'],
    });
    expect(result[1]).toStrictEqual({
      id: '(-/T',
      deckName: 'Deutsch::Wörterbuch',
      deckType: 'Basic (and reversed card)',
      card1: 'die Zeit',
      card2: 'the time',
      tags: ['noun'],
    });
  });

  it('should parse a single line record when ontly the id column contains quotes', () => {
    const input = ['"bB$#T"	Basic (and reversed card)	Deutsch::Verben	tauen ;; to thaw	taute ;; ist getaut	'];
    const result = parseRecords(input, metadata);
    expect(result.length).toStrictEqual(1);
    expect(result[0].id).toStrictEqual('"bB$#T"');
    expect(result[0].deckType).toStrictEqual('Basic (and reversed card)');
    expect(result[0].deckName).toStrictEqual('Deutsch::Verben');
    expect(result[0].card1).toStrictEqual('tauen ;; to thaw');
    expect(result[0].card2).toStrictEqual('taute ;; ist getaut');
    expect(result[0].tags).toStrictEqual(undefined);
  });

  it('should parse multi line records', () => {
    const input = [
      'UBN+T\tBasic (and reversed card)	Deutsch::Wörterbuch	"die Brieftasche, ',
      'die Geldtasche, ',
      'die Geldbörse, ',
      'der Geldbeutel, ',
      'das Portemonnaie"\tthe wallet\tnoun  ',
    ];
    const result = parseRecords(input, metadata);

    expect(result.length).toStrictEqual(1);
    const record = result[0];

    expect(record.id).toStrictEqual('UBN+T');
    expect(record.deckType).toStrictEqual('Basic (and reversed card)');
    expect(record.deckName).toStrictEqual('Deutsch::Wörterbuch');
    expect(record.card1).toStrictEqual(
      'die Brieftasche, die Geldtasche, die Geldbörse, der Geldbeutel, das Portemonnaie',
    );
    expect(record.card2).toStrictEqual('the wallet');
    expect(record.tags).toStrictEqual(['noun']);
  });

  it('should parse mixed single and multi line records', () => {
    const input = [
      'LO*JQ	Basic (and reversed card)	Deutsch::Wörterbuch	der Verkehr	the traffic	noun',
      'ry2+6	Basic (and reversed card)	Deutsch::Wörterbuch	von ... nach ...	from ... to ... ( z ... do ... )	adverb',
      'UBN+T	Basic (and reversed card)	Deutsch::Wörterbuch	"die Brieftasche, ',
      'die Geldtasche, ',
      'die Geldbörse,',
      'der Geldbeutel,',
      'das Portemonnaie"	the wallet	noun',
      'DGqM3	Basic (and reversed card)	Deutsch::Wörterbuch	bleiben	to stay	verb',
      'l{3^C	Basic (and reversed card)	Deutsch::Wörterbuch	das Schwimmbad	the public bath , the pool	noun',
      '/:gy5	Basic (and reversed card)	Deutsch::Wörterbuch	der Eintritt	"the admission, ',
      'the entering, ',
      'the joining (firm)"	noun',
      'tsZjD	Basic (and reversed card)	Deutsch::Wörterbuch	der Treffpunkt	the meating point	noun     ',
    ];

    const result = parseRecords(input, metadata);

    expect(result.length).toStrictEqual(7);
    expect(result[0].id).toStrictEqual('LO*JQ');
    expect(result[1].id).toStrictEqual('ry2+6');
    expect(result[2].id).toStrictEqual('UBN+T');
    expect(result[3].id).toStrictEqual('DGqM3');
    expect(result[4].id).toStrictEqual('l{3^C');
    expect(result[5].id).toStrictEqual('/:gy5');
    expect(result[6].id).toStrictEqual('tsZjD');
  });
});

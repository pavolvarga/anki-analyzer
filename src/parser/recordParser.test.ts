import { mergeMultilineRecord, parseRecords } from './recordParser';
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
});

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

import { AnkiMetadata } from './types';

function parseSeparator(input: string[]): string {
  const separatorLine = input.find((line: string) => line.startsWith('#separator'));
  if (separatorLine === undefined) {
    throw new Error(`Corrupted metada - unable to find separator`);
  }
  const splitted = separatorLine.split(':');
  if (splitted.length !== 2) {
    throw new Error(`Corrupted metadata - unable to find separator`);
  }
  if (splitted[1] !== 'tab') {
    throw new Error(`Corrupted metadata - unknown separator: ${splitted[1]}`);
  }
  return '\t';
}

function parseHtml(input: string[]): boolean {
  const htmlLine = input.find((line: string) => line.startsWith('#html'));
  if (htmlLine === undefined) {
    return false;
  }
  const splitted = htmlLine.split(':');
  if (splitted.length !== 2) {
    return false;
  }
  return splitted[1].toLowerCase() === 'true';
}

function parseColumnPosition(input: string[], columnName: string): number {
  const columnLine = input.find((line: string) => line.startsWith(columnName));
  if (columnLine === undefined) {
    throw new Error(`Corrupted metadata - unable to find position for column: ${columnName}`);
  }
  const splitted = columnLine.split(':');
  if (splitted.length !== 2) {
    throw new Error(`Corrupted metadata - unable to find position for column: ${columnName}`);
  }
  return parseInt(splitted[1], 10);
}

export function parseMedata(input: string[]): AnkiMetadata {
  return {
    separator: parseSeparator(input),
    usedHtml: parseHtml(input),
    guidColumnPosition: parseColumnPosition(input, '#guid'),
    notetypeColumnPosition: parseColumnPosition(input, '#notetype'),
    deckColumnPosition: parseColumnPosition(input, '#deck'),
    tagsColumnPosition: parseColumnPosition(input, '#tags'),
  };
}

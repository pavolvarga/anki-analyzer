import { isArray } from 'lodash';
import { DEFAULT_EXPLANATION_BRACKETS, DEFAULT_MEANING_SEPARATOR, DEFAULT_SYNONYM_SEPARATOR } from '../const';
import { ExplanationBracketType } from '../types';

const DUPLICIT_MARKER_SEPARATOR = '||';

function isNumeric(num: any) {
  return (typeof num === 'number' || (typeof num === 'string' && num.trim() !== '')) && !isNaN(num as number);
}

function parseNumeric(options: any, name: string, optionName: string) {
  if (options === undefined) {
    return undefined;
  }
  if (options[name] === undefined) {
    return undefined;
  }
  if (!isNumeric(options[name])) {
    throw new Error(`Expected ${optionName} to be a number, but got ${typeof options[name]}`);
  }
  return parseInt(options[name], 10);
}

function parseWithDefaultValue(
  options: any,
  name: string,
  optionName: string,
  type: 'string' | 'number',
  defaultValue: string | number,
) {
  if (options === undefined) {
    return undefined;
  }
  if (options[name] === undefined) {
    return undefined;
  }
  if (typeof options[name] === 'boolean') {
    return defaultValue;
  }
  if (typeof options[name] !== type) {
    throw new Error(`Expected ${optionName} to be a ${type}, but got ${typeof options[name]}`);
  }
  return options[name];
}

export function parseOptionLimitRows(options: any): number | undefined {
  return parseNumeric(options, 'limitRows', '--limit-rows');
}

export function parseOptionOmitRows(options: any): number | undefined {
  return parseNumeric(options, 'omitRows', '--omit-rows');
}

export function parseOptionTags(options: any): string[] | undefined {
  if (options === undefined) {
    return undefined;
  }
  if (options.tags === undefined) {
    return undefined;
  }
  if (typeof options.tags === 'string') {
    return [options.tags];
  }
  if (!Array.isArray(options.tags)) {
    throw new Error(`Expected --tags to be a single string or array of string, but got ${typeof options.tags}`);
  }
  return options.tags;
}

export function parseOptionPrefixSeparator(options: any): string {
  return options.prefixSeparator;
}

export function parseOptionMeaningSeparator(options: any): string | undefined {
  return parseWithDefaultValue(options, 'meaningSeparator', '--meaning-separator', 'string', DEFAULT_MEANING_SEPARATOR);
}

export function parseOptionSynonymSeparator(options: any): string | undefined {
  return parseWithDefaultValue(options, 'synonymSeparator', '--synonym-separator', 'string', DEFAULT_SYNONYM_SEPARATOR);
}

export function parseOptionExplanationBrackets(options: any): ExplanationBracketType {
  return options.explanationBracket ?? DEFAULT_EXPLANATION_BRACKETS;
}

export function parseOptionDuplicitMarkers(options: any): undefined | string[][] {
  if (options === undefined) {
    return undefined;
  }

  const { duplicitMarkers } = options;
  if (duplicitMarkers === undefined || duplicitMarkers.lenght === 0) {
    return undefined;
  }

  if (!isArray(duplicitMarkers)) {
    if (!duplicitMarkers.includes(DUPLICIT_MARKER_SEPARATOR)) {
      throw new Error(`Duplicit markers must contain || separator, not all of them do: ${duplicitMarkers}`);
    }
    const parts = duplicitMarkers.split(DUPLICIT_MARKER_SEPARATOR);
    return [parts.map((part: string) => part.trim())];
  }

  if (!duplicitMarkers.every((marker: string) => marker.includes(DUPLICIT_MARKER_SEPARATOR))) {
    throw new Error(`Duplicit markers must contain || separator, not all of them do: ${duplicitMarkers}`);
  }

  return duplicitMarkers.map((marker: string) => {
    const parts = marker.split(DUPLICIT_MARKER_SEPARATOR);
    return parts.map((part: string) => part.trim());
  });
}

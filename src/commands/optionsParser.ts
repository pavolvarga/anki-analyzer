import { DEFAULT_EXPLANATION_BRACKETS, DEFAULT_MEANING_SEPARATOR, DEFAULT_SYNONYM_SEPARATOR } from '../const';
import { ExplanationBracketType } from '../types';

function parse(options: any, name: string, optionName: string, type: 'string' | 'number') {
  if (options === undefined) {
    return undefined;
  }
  if (options[name] === undefined) {
    return undefined;
  }
  if (typeof options[name] !== type) {
    throw new Error(`Expected ${optionName} to be a ${type}, but got ${typeof options[name]}`);
  }
  return options[name];
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
  return parse(options, 'limitRows', '--limit-rows', 'number');
}

export function parseOptionOmitRows(options: any): number | undefined {
  return parse(options, 'omitRows', '--omit-rows', 'number');
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

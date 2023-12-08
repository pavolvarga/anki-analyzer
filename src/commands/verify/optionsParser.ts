import { DEFAULT_LIMIT_ROW_COUNT, DEFAULT_MEANING_SEPARATOR } from '../../const';
import { VerifyCmdOptions } from './types';
import {
  parseOptionLimitRows,
  parseOptionMeaningSeparator,
  parseOptionOmitRows,
  parseOptionTags,
} from '../optionsParser';

export function parse(options: any): VerifyCmdOptions {
  if (options === undefined) {
    throw new Error('One --verify-* option must be used.');
  }

  const result: any = {
    limitRowCount: parseOptionLimitRows(options) ?? DEFAULT_LIMIT_ROW_COUNT,
    omitRowCount: parseOptionOmitRows(options),
    tags: parseOptionTags(options),
    meaningSeparator: parseOptionMeaningSeparator(options) ?? DEFAULT_MEANING_SEPARATOR,
  };

  const { verifyMeaningSeparatorUsed, verifyMeaningSeparatorNotUsed, verifyTagsUsed, verifyTagsNotUsed } = options;

  if (
    verifyMeaningSeparatorUsed === undefined &&
    verifyMeaningSeparatorNotUsed === undefined &&
    verifyTagsUsed === undefined &&
    verifyTagsNotUsed === undefined
  ) {
    throw new Error('One --verify-* option must be used.');
  }

  const arrOptions = [verifyMeaningSeparatorUsed, verifyMeaningSeparatorNotUsed, verifyTagsUsed, verifyTagsNotUsed];
  if (arrOptions.filter((v) => v === undefined).length < 3) {
    const count = arrOptions.filter((v) => v !== undefined).length;
    throw new Error(`Only one --verify-* option can be used. But were used ${count} options.`);
  }

  if (verifyTagsUsed) {
    result.operation = 'verify-tags-used';
  }
  if (verifyTagsNotUsed) {
    result.operation = 'verify-tags-not-used';
  }

  if (verifyMeaningSeparatorUsed) {
    result.operation = 'verify-meaning-separator-used';
    result.operationArg = verifyMeaningSeparatorUsed;
  }

  if (verifyMeaningSeparatorNotUsed) {
    result.operation = 'verify-meaning-separator-not-used';
    result.operationArg = verifyMeaningSeparatorNotUsed;
  }

  if (result.operation === 'verify-tags-used' && result.tags !== undefined) {
    throw new Error('Option --verify-tags-used can not be used together with the --tags option.');
  }
  if (result.operation === 'verify-tags-not-used' && result.tags !== undefined) {
    throw new Error('Option --verify-tags-not-used can not be used together with the --tags option.');
  }

  return result as VerifyCmdOptions;
}

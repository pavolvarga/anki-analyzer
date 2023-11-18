import { InfoCmdOptions } from './types';
import { parse as baseParseOptions } from '../optionsParser';

export function parse(options: any): InfoCmdOptions | undefined {
  const cmdOptions = baseParseOptions(options);
  if (cmdOptions === undefined) {
    return undefined;
  }
  return {
    ...cmdOptions,
    tags: options.tags ? true : false,
  };
}

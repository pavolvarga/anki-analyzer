function parseNumberic(options: any, name: string, optionName: string) {
  if (options === undefined) {
    return undefined;
  }
  if (options[name] === undefined) {
    return undefined;
  }
  if (typeof options[name] !== 'number') {
    throw new Error(`Expected ${optionName} to be a number, but got ${typeof options[name]}`);
  }
  return options[name];
}

export function parseOptionLimitRows(options: any): number | undefined {
  return parseNumberic(options, 'limitRows', '--limit-rows');
}

export function parseOptionOmitRows(options: any): number | undefined {
  return parseNumberic(options, 'omitRows', '--omit-rows');
}

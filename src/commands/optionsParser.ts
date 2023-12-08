function parseNumeric(options: any, name: string, optionName: string) {
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
    throw new Error(`Expected --tags to be a single or array of string, but got ${typeof options.tags}`);
  }
  return options.tags;
}

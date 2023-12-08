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
    throw new Error(`Expected --tags to be a single or array of string, but got ${typeof options.tags}`);
  }
  return options.tags;
}

export function parsePrefixSeparator(options: any): string | undefined {
  return parse(options, 'prefixSeparator', '--prefix-separator', 'string');
}

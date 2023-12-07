import { Option, Argument } from 'commander';
import {
  DEFAULT_MEANING_SEPARATOR,
  DEFAULT_SYNONYM_SEPARATOR,
  DEFAULT_EXPLANATION_BRACKET,
  DEFAULT_LIMIT_ROW_COUNT,
} from './const';

// common choices

const explanationBracketsChoices = ['curly', 'round', 'square'];

export const cardChoices = ['card1', 'card2', 'both'];

// common options (all options in this list should have short version)

export const meaningSeparatorOption = new Option(
  '-m, --meaning-separator [separator]',
  `Specify separator for 'pieces of information', like: 'essen ${DEFAULT_MEANING_SEPARATOR} to eat', if none is used it defaults to '${DEFAULT_MEANING_SEPARATOR}'.`,
);

export const synonymSeparatorOption = new Option(
  '-s, --synonym-separator [separator]',
  `Specify separator for synonyms, when one word has multiple translations, like: 'to repel${DEFAULT_SYNONYM_SEPARATOR} to fight off' for 'abwehren', if none is used it defaults to '${DEFAULT_SYNONYM_SEPARATOR}'.`,
);

export const prefixSeparatorOption = new Option(
  '-p, --prefix-separator <separator>',
  'Specify separator for prefixes (or suffixes). For example vor-stellen, the root verb is stellen, and vor is the prefix.\n' +
    'If none is used, it is assummed that prefix separation is not used.\n' +
    'No space is allowed between prefix (or suffix) and the word it is attached to.',
);

export const explanationBracketsOption = new Option(
  '-e, --explanation-brackets <bracket-type>',
  `Specify type of brackets for additional explanation. If none is used, it defaults to ${DEFAULT_EXPLANATION_BRACKET} brackets.`,
).choices(explanationBracketsChoices);

export const limitRowsOption = new Option(
  '-l, --limit-rows <count>',
  `If additional data is outputed in table format, then by default ${DEFAULT_LIMIT_ROW_COUNT} rows are shown. Use this option to change the number of rows shown.\n` +
    'If multiple tables are shown, then this option applies to all of them.',
);

export const omitRowsOption = new Option(
  '-o, --omit-rows <count>',
  'The --limit-rows shows the first n rows.\n' +
    'Use this option if you want to omit the first n rows and then show the specified rows.\n' +
    'This option is ignored if the --limit-rows option is not used.\n' +
    'If multiple tables are shown, then this option applies to all of them.\n' +
    'If ommiting would lead to showing no rows, then the last rows are shown instead\n' +
    '(for example there are 10 rows total, you want to omit 6 rows, and limit to 5 rows, then the last 5 rows are shown).',
);

export const tagsOption = new Option(
  '-t, --tags <tags...>',
  'Narrow command / operation to specified tags. If not specified, then command / operation is applied to whole deck.',
);

// common arguments

export const argumentFile = new Argument('<file>', 'File containing exported Anki Decks');

export const argumentDeck = new Argument(
  '<deck-name>',
  'Name of one Anki Deck.\n' +
    'Either use full name, or append `*` to start of a name to indicate search by startsWith,\n' +
    'when multiple decks match the beginning of the name, error is thrown.',
);

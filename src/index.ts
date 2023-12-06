import { Argument, Command, Option } from 'commander';
import figlet from 'figlet';

import { DEFAULT_EXPLANATION_BRACKET, DEFAULT_MEANING_SEPARATOR, DEFAULT_SYNONYM_SEPARATOR } from './const';

import { commandInfo } from './commands/info/info';
import { commandDeck } from './commands/deck/deck';
import { commandCompare } from './commands/compare/compare';
import { commandVerify } from './commands/verify/verify';
import { commandDuplicate } from './commands/duplicate/duplicate';
import { commandList } from './commands/list/list';

const program = new Command();

program
  .name('anki-analyzer')
  .version('0.6.0', '-v, --version', 'Display current version')
  .description(
    'App for analyzing exported Anki Decks.\n' +
      'It is assumed that the exported Anki Decks are in CSV format and do not contain HTML or multimedia links.\n' +
      'If that is not the case, error will be thrown.',
  )
  .option('-h, --help', 'Display help');

const explanationBracketsChoices = ['curly', 'round', 'square'];
const cardChoices = ['card1', 'card2', 'both'];

const meaningSeparatorOption = new Option(
  '-m, --meaning-separator [separator]',
  `Specify separator for 'pieces of information', like: 'essen ${DEFAULT_MEANING_SEPARATOR} to eat', if none is used it defaults to '${DEFAULT_MEANING_SEPARATOR}'`,
);
const synonymSeparatorOption = new Option(
  '-s, --synonym-separator [separator]',
  `Specify separator for synonyms, when one word has multiple translations, like: 'to repel${DEFAULT_SYNONYM_SEPARATOR} to fight off' for 'abwehren', if none is used it defaults to '${DEFAULT_SYNONYM_SEPARATOR}'`,
);
const explanationBracketsOption = new Option(
  '-e, --explanation-brackets <bracket-type>',
  `Specify type of brackets for additional explanation. If none is used, it defaults to ${DEFAULT_EXPLANATION_BRACKET} brackets.`,
).choices(explanationBracketsChoices);

const argumentFile = new Argument('<file>', 'File containing exported Anki Decks');
const argumentDeck = new Argument(
  '<deck-name>',
  'Name of one Anki Deck. Either use full name, or append `*` to start of a name to indicate search by startsWith, when multiple decks match the beginning of the name, error is thrown.',
);

program
  .command('info')
  .description(
    'Display basic information about exported Anki Decks.\nUse optional options to show adiditonal information.',
  )
  .addArgument(argumentFile)
  .addOption(meaningSeparatorOption)
  .addOption(synonymSeparatorOption)
  .addOption(explanationBracketsOption)
  .action(commandInfo);

program
  .command('deck')
  .description(
    'Display information about one specific Anki Deck.\nUse optional options to show adiditonal information.',
  )
  .addArgument(argumentFile)
  .addArgument(argumentDeck)
  .addOption(meaningSeparatorOption)
  .addOption(synonymSeparatorOption)
  .addOption(explanationBracketsOption)
  .addOption(
    new Option('-t, --tags', 'If present and if tags are used for specified deck, count of individual tags is shown.'),
  )
  .addOption(
    new Option(
      '-c, --tag-combinations',
      'If present and if tags are used for specified deck, then count of tag combinations is shown.\nIf no combination of tags is used, nothing is shown.',
    ),
  )
  .action(commandDeck);

program
  .command('verify')
  .description(
    'Verify that specified Anki Deck is in expected format.\n' +
      'Those notes that do not match the expected format are displayed.\n' +
      'It is possible to use only single --verify-* option at same time.\n' +
      'One --verify-* option must be used, otherwise an error is thrown.',
  )
  .addArgument(argumentFile)
  .addArgument(argumentDeck)
  .addOption(meaningSeparatorOption)
  .addOption(
    new Option(
      '-t, --tags <tags...>',
      'Narrow verification to specified tags. This option can not be used together with the `--verify-tags-used` option.',
    ),
  )
  .addOption(
    new Option(
      '--verify-meaning-separator-used <card>',
      'Verify that meaning separtor is used, either in card1, card2 or both',
    ).choices(cardChoices),
  )
  .addOption(
    new Option(
      '--verify-meaning-separator-not-used <card>',
      'Verify that meaning separtor is not used, either in card1, card2 or both',
    ).choices(cardChoices),
  )
  .addOption(
    new Option(
      '--verify-tags-used',
      'Verify that tags are used in all notes.\n If used together with the `--tags option, error is thrown.`',
    ),
  )
  .addOption(
    new Option(
      '--verify-tags-not-used',
      'Verify that tags are not used in any note.\n If used together with the `--tags option, error is thrown.`',
    ),
  )
  .action(commandVerify);

program
  .command('compare')
  .description(
    'Compares two Anki Decks.\n' +
      'It assumes that one deck is a general deck with tagged cards and the other one is a deck specific for exactly one tag.\n' +
      'For example the general deck has tags for `Nouns`, `Verbs`, `Adjectives`.\n' +
      'The specific deck is for Nouns (to practice also plural forms), or is for Verbs (to practice also past tense forms).\n' +
      'This command then enables comparison of the two decks to list what is missing and what is different in the general deck or in the specific deck and vice versa.\n' +
      'For command to work, these assertions must be true:\n' +
      'General deck is not using meaning separator in both cards.\n' +
      'Specific deck is using meaning separator in card1\n' +
      'If these assertions are not true, then the command will fail on the first record that fails one of these assertions.\n' +
      'By default it prints short status of the comparison, to see more details use specific options.',
  )
  .addArgument(argumentFile)
  .argument(
    '<general-deck-name>',
    'Name of the general Anki Deck\n.' +
      'Either use full name, or append `*` to start of a name to indicate search by startsWith, when multiple decks match the beginning of the name, error is thrown.',
  )
  .argument(
    '<specific-deck-name>',
    'Name of the specific Anki Deck\n.' +
      'Either use full name, or append `*` to start of a name to indicate search by startsWith, when multiple decks match the beginning of the name, error is thrown.',
  )
  .argument('<tag-name>', 'Name of the tag used in the general deck.')
  .addOption(meaningSeparatorOption)
  .addOption(
    new Option(
      '-p, --prefix-separator <separator>',
      'Specify separator for prefixes. For example vor-stellen, the root verb is stellen, and vor is the prefix.\n' +
        'If none is used, it is assummed that prefix separation is not used.\n' +
        'If prefix is specified, then during comparisions it is removed.\n',
    ),
  )
  .addOption(
    new Option(
      '--show-comparision-table <table>',
      'If present then either one of the comparision table is shown or all of them.\n' +
        'For breviety, for each table (or all of them) only first 10 rows are shown.\n' +
        'To change the number of rows shown use the --max-row-count option.\n' +
        'If this option is not used, then only short status is shown.',
    ).choices(['all', 'different', 'only-in-general', 'only-in-specific']),
  )
  .addOption(
    new Option(
      '--max-row-count <count>',
      'Specify maximum number of rows to show in comparision table. If not specified, then 10 is used.\n' +
        'This option is used only when --show-comparision-table is used as well.',
    ),
  )
  .action(commandCompare);

program
  .command('duplicate')
  .description(
    'Find duplicate notes in specified Anki Deck.\n' +
      'Cards are split using the synonym separator. So if two notes have the same word in card1 or in card2, they will be considered duplicates.\n' +
      'It is assumed that meaning separator is not used in both cards.\n' +
      'It is assumed that synonym separator is used in both cards.\n' +
      'Use tags option to narrow search to specified tags.\n' +
      'By default it prints short status of the duplicates, to see more details use specific options.',
  )
  .addArgument(argumentFile)
  .addArgument(argumentDeck)
  .addOption(synonymSeparatorOption)
  .addOption(
    new Option(
      '-t, --tags <tags...>',
      'Narrow search to specified tags. If not specified, then whole deck is searched.',
    ),
  )
  .addOption(
    new Option(
      '--show-duplicates-table <card>',
      'If present then table with all duplicates is shown.\n' +
        'For breviety, only first 10 rows are shown.\n' +
        'To change the number of rows shown use the --max-row-count option.\n' +
        'If this option is not used, then only short status is shown.',
    ).choices(cardChoices),
  )
  .addOption(
    new Option(
      '--max-row-count <count>',
      'Specify maximum number of rows to show in duplicates table. If not specified, then 10 is used.\n' +
        'This option is used only when --show-duplicates-table is used as well.',
    ),
  )
  .action(commandDuplicate);

program
  .command('list')
  .description(
    'List those Records in specified Anki deck that contain specified separators.\n' +
      'At least one --list* option must be used, but more can be used at same time.\n' +
      'By default it print 10 records, to change this use --max-row-count option.\n' +
      'Separators use default values if not provided, use options to specify them',
  )
  .argument(
    '<deck-name>',
    'Name of one Anki Deck. Either use full name, or append `*` to start of a name to indicate search by startsWith, when multiple decks match the beginning of the name, error is thrown.',
  )
  .addArgument(argumentFile)
  .addOption(meaningSeparatorOption)
  .addOption(synonymSeparatorOption)
  .addOption(explanationBracketsOption)
  .addOption(
    new Option(
      '-t, --tags <tags...>',
      'Narrow listing to specified tags. If not specified, then whole deck is searched.',
    ),
  )
  .addOption(
    new Option(
      '-c, --card <card>',
      'Specify card for testing presence of separators. If not specified, then both cards are tested by default.',
    ).choices(cardChoices),
  )
  .addOption(
    new Option(
      '--list-cards-with-meaning-separator',
      'If used, then all records that contain meaning separator in card1, card2 or both are listed',
    ),
  )
  .addOption(
    new Option(
      '--list-cards-with-synonym-separator',
      'If used, then all records that contain synonym separator in card1, card2 or both are listed',
    ),
  )
  .addOption(
    new Option(
      '--list-cards-with-explanation-brackets',
      'If used, then all records that contain explanation brackets in card1, card2 or both are listed',
    ),
  )
  .addOption(
    new Option(
      '--max-row-count <count>',
      'Specify maximum number of rows to show in outputed table. If not specified, then 10 is used.',
    ),
  )
  .action(commandList);

console.log(figlet.textSync('Anki Analyzer'));
console.log('\n');

try {
  program.parse(process.argv);
} catch (err: any) {
  console.error(`Error occurred: ${err?.message ?? 'unknown'}`);
  process.exit(1);
}

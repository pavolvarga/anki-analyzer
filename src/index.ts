import { Command, Option } from 'commander';
import figlet from 'figlet';

import { DEFAULT_LIMIT_ROW_COUNT } from './const';
import {
  cardChoices,
  meaningSeparatorOption,
  synonymSeparatorOption,
  prefixSeparatorOption,
  explanationBracketsOption,
  tagsOption,
  limitRowsOption,
  omitRowsOption,
  argumentDeck,
  argumentFile,
} from './commonSettings';

import { commandInfo } from './commands/info/info';
import { commandDeck } from './commands/deck/deck';
import { commandVerify } from './commands/verify/verify';
import { commandCompare } from './commands/compare/compare';
import { commandDuplicates } from './commands/duplicates/duplicates';
import { commandList } from './commands/list/list';

const program = new Command();

program
  .name('anki-analyzer')
  .version('0.11.0', '-v, --version', 'Display current version')
  .description(
    'App for analyzing exported Anki Decks.\n' +
      'It is assumed that the exported Anki Decks are in CSV format and do not contain HTML or multimedia links.\n' +
      'If that is not the case, error will be thrown.',
  )
  .option('-h, --help', 'Display help');

const infoCmdSummary = 'Display basic information about exported Anki Decks.';
program
  .command('info')
  .summary(infoCmdSummary)
  .description(
    infoCmdSummary +
      '\n\n' +
      'For each deck in the exported Anki Decks file shows basic information.\n' +
      'When no options are used, then only basic information is shown.',
  )
  .addArgument(argumentFile)
  .addOption(meaningSeparatorOption)
  .addOption(synonymSeparatorOption)
  .addOption(prefixSeparatorOption)
  .addOption(explanationBracketsOption)
  .action(commandInfo);

const deckCmdSummary = 'Display information about one specific Anki Deck.';
program
  .command('deck')
  .summary(deckCmdSummary)
  .description(
    deckCmdSummary +
      '\n\n' +
      'By default it can show the same information as the `info` command for specified deck.\n' +
      'Use additional options to show more information.',
  )
  .addArgument(argumentFile)
  .addArgument(argumentDeck)
  .addOption(meaningSeparatorOption)
  .addOption(synonymSeparatorOption)
  .addOption(prefixSeparatorOption)
  .addOption(explanationBracketsOption)
  .addOption(
    new Option(
      '--count-tags',
      'If present and if tags are used for specified deck, count of individual tags is shown.\n' +
        'Sorted by the count of notes with the tag in descending order.\n',
    ),
  )
  .addOption(
    new Option(
      '--count-tag-combinations',
      'If present and if tags are used for specified deck, then count of tag combinations is shown.\n' +
        'Sorted by the count of notes with the tag combination in descending order.\n' +
        'If no combination of tags is used, nothing is shown.',
    ),
  )
  .action(commandDeck);

const verifyCmdSummary = 'Verify that specified Anki Deck is in expected format.';
program
  .command('verify')
  .summary(verifyCmdSummary)
  .description(
    verifyCmdSummary +
      '\n\n' +
      'Those notes that do not match the expected format are displayed.\n' +
      `For breviety, only first ${DEFAULT_LIMIT_ROW_COUNT} records are shown. Use option --limit-rows to show more.\n` +
      'It is possible to use only single --verify-* option at same time.\n' +
      'One --verify-* option must be used, otherwise an error is thrown.',
  )
  .addArgument(argumentFile)
  .addArgument(argumentDeck)
  .addOption(meaningSeparatorOption)
  .addOption(tagsOption)
  .addOption(limitRowsOption)
  .addOption(omitRowsOption)
  .addOption(
    new Option(
      '--verify-meaning-separator-used <card>',
      'Verify that meaning separator is used, either in card1, card2 or both.\n' +
        'Sorted by the card1 of in case of card1 and both, otherwise sorted by the card2.',
    ).choices(cardChoices),
  )
  .addOption(
    new Option(
      '--verify-meaning-separator-not-used <card>',
      'Verify that meaning separator is not used, either in card1, card2 or both.\n' +
        'Sorted by the card1 of in case of card1 and both, otherwise sorted by the card2.',
    ).choices(cardChoices),
  )
  .addOption(
    new Option(
      '--verify-tags-used',
      'Verify that tags are used in all notes. If used together with the `--tags` option, error is thrown.\n' +
        'Sorted by the card1.',
    ),
  )
  .addOption(
    new Option(
      '--verify-tags-not-used',
      'Verify that tags are not used in any note. If used together with the `--tags` option, error is thrown.\n' +
        'Sorted by the card1.',
    ),
  )
  .action(commandVerify);

const compareCmdSummary = 'Compares two Anki Decks.';
program
  .command('compare')
  .summary(compareCmdSummary)
  .description(
    compareCmdSummary +
      '\n\n' +
      'It assumes that one deck is a general deck with tagged cards and the other one is a deck specific for exactly one tag.\n' +
      'For example the general deck has tags for `Nouns`, `Verbs`, `Adjectives`.\n' +
      'The specific deck is for Nouns (to practice also plural forms), or is for Verbs (to practice also past tense forms).\n' +
      'This command then enables comparison of the two decks to list what is missing and what is different in the general deck or in the specific deck and vice versa.\n' +
      'For command to work, these assertions must be true:\n' +
      'General deck is not using meaning separator in both cards.\n' +
      'Specific deck is using meaning separator in card1.\n' +
      'If these assertions are not true, then the command will fail on the first record that fails one of these assertions.\n' +
      'By default it prints short status of the comparison, to see more details use specific options.\n' +
      'It is assumed that words in both decks are same. If for example in one deck prefix / suffix separator used match will fail.\n' +
      'Specify the prefix separator and it will be removed, so that the match can succeed.\n' +
      'There other reason why the match can fail, for example if the same word is used both as a noun and as a verb.\n' +
      'This possibility is handled by the `tag-markers` option.\n' +
      'Another reason could be that same word is entered multiple times but with some additional metadata.\n' +
      'This possiblity is handled by the `duplicit-markers option.\n',
  )
  .addArgument(argumentFile)
  .argument(
    '<general-deck-name>',
    'Name of the general Anki Deck.\n' +
      'Either use full name, or append `*` to start of a name to indicate search by startsWith, when multiple decks match the beginning of the name, error is thrown.',
  )
  .argument(
    '<specific-deck-name>',
    'Name of the specific Anki Deck.\n' +
      'Either use full name, or append `*` to start of a name to indicate search by startsWith, when multiple decks match the beginning of the name, error is thrown.',
  )
  .argument('<tag-name>', 'Name of the tag used in the general deck.')
  .addOption(meaningSeparatorOption)
  .addOption(prefixSeparatorOption)
  .addOption(limitRowsOption)
  .addOption(omitRowsOption)
  .addOption(
    new Option(
      '--show-comparision-table <table>',
      'If present then either one of the comparision table is shown or all of them.\n' +
        'Each table is sorted by the card1 of the general deck.\n' +
        `For breviety, for each table (or all of them) only first ${DEFAULT_LIMIT_ROW_COUNT} rows are shown.\n` +
        'To change the number of rows shown use the --lmit option.\n' +
        'If this option is not used, then only short status is shown.',
    ).choices(['all', 'different', 'only-in-general', 'only-in-specific']),
  )
  .addOption(
    new Option(
      '--tag-markers <tag-markers...>',
      'It can happen that a single word is used both as an adjective and as a verb (for example `betreten` in german).\n' +
        'Which means that in the general deck the card1 can contain this information, for example `betreten (verb)`.\n' +
        'In the specific deck the card1 can contain only the word, for example `betreten`.\n' +
        'In this case the comparison will fail, because the words are not same.\n' +
        'To overcome this, specify the tag markers, for example `(verb)`.\n' +
        'If they are specified these `tag-markers are removed from the card1 of the general deck, so that comparison does not mark such notes as different.',
    ),
  )
  .addOption(
    new Option(
      '--duplicit-markers <duplicit-markers...>',
      'It can happen that a single word exists twice or more in the general deck.\n' +
        'One good example would be german verbs, some verbs can be both trennbar and untrennbar, which changes meaning (like `durchbrechen (trennbar)` and `durchbrechen (untrennbar)`).\n' +
        'In the specific deck the markers `(trennbar)` and `(untrennbar)` will not exists, so comaparision will not not think those entries are the same.\n' +
        'To address that, use this option to specify such `duplicit-markers`.\n' +
        'For example: `--duplicit-markers (trennbar)||(untrennbar) (weak)||(strong).\n' +
        'In the above example two pairs of duplici-markers are specified, which means the comparision logic will consider them when doing comparing.\n' +
        'The duplicit-markers must be string together with the `||` separator without spaces.',
    ),
  )
  .action(commandCompare);

const duplicatesCmdSummary = 'Find duplicate notes in specified Anki Deck.';
program
  .command('duplicates')
  .summary(duplicatesCmdSummary)
  .description(
    duplicatesCmdSummary +
      '\n\n' +
      'Cards are split using the synonym separator.\n' +
      'So if two notes have the same word in card1 or in card2, they will be considered duplicates.\n' +
      'It is assumed that meaning separator is not used in both cards.\n' +
      'It is assumed that synonym separator is used in both cards.\n' +
      'Use tags option to narrow search to specified tags.\n' +
      'By default it prints short status of the duplicates, to see more details use `--show-duplicates-table` option.',
  )
  .addArgument(argumentFile)
  .addArgument(argumentDeck)
  .addOption(synonymSeparatorOption)
  .addOption(tagsOption)
  .addOption(limitRowsOption)
  .addOption(omitRowsOption)
  .addOption(
    new Option(
      '--show-duplicates-table <card>',
      'If present then table with all duplicates is shown.\n' +
        'Table or tables are sorted by the duplicated word.\n' +
        `For breviety, only first ${DEFAULT_LIMIT_ROW_COUNT} rows are shown.\n` +
        'To change the number of rows shown use the --limit-rows option.',
    ).choices(cardChoices),
  )
  .action(commandDuplicates);

const listCmdSummary = 'List those Records in specified Anki deck that contain specified separators.';
program
  .command('list')
  .summary(listCmdSummary)
  .description(
    listCmdSummary +
      '\n\n' +
      'At least one --list* option must be used, but more can be used at same time.\n' +
      `By default it print ${DEFAULT_LIMIT_ROW_COUNT} records, to change this use --limit-rows option.\n` +
      'Separators use default values if not provided, use options to specify them.',
  )
  .addArgument(argumentFile)
  .addArgument(argumentDeck)
  .addOption(meaningSeparatorOption)
  .addOption(synonymSeparatorOption)
  .addOption(prefixSeparatorOption)
  .addOption(explanationBracketsOption)
  .addOption(tagsOption)
  .addOption(
    new Option(
      '-c, --card <card>',
      'Specify card for testing presence of separators. If not specified, then both cards are tested by default.\n' +
        'Output tables are sorted by this option. In case of both cards, then card1 is used for sorting.',
    ).choices(cardChoices),
  )
  .addOption(limitRowsOption)
  .addOption(omitRowsOption)
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
      '--list-cards-with-prefix-separator',
      'If used, then all records that contain prefix separator in card1, card2 or both are listed \n' +
        'You must specify prefix separator using the --prefix-separator option, otherwise error is thrown.',
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

import { Command, Option } from 'commander';
import figlet from 'figlet';

import { commandInfo } from './commands/info/info';
import { commandDeck } from './commands/deck/deck';
import { commandCompare } from './commands/compare/compare';
import { commandVerify } from './commands/verify/verify';

const program = new Command();

program
  .name('anki-analyzer')
  .version('0.3.0', '-v, --version', 'Display current version')
  .description('App for analyzing exported Anki Decks')
  .option('-h, --help', 'Display help');

const meaningSeparatorOption = new Option(
  '-m, --meaning-separator [separator]',
  'Specify separator for `pieces of information`, like: `essen ;; to eat`, if none is used it defaults to `;;`',
);
const synonymSeparatorOption = new Option(
  '-s, --synonym-separator [separator]',
  'Specify separator for synonyms, when one word has multiple translations, like: `to repel, to fight off` for `abwehren`, if none is used it defaults to `,`',
);
const explanationBracketsOption = new Option(
  '-e, --explanation-brackets <bracket-type>',
  'Specify type of brackets for additional explanation',
).choices(['round', 'square', 'curly']);

program
  .command('info')
  .description(
    'Display basic information about exported Anki Decks.\nUse optional options to show adiditonal information.',
  )
  .argument('<file>', 'File containing exported Anki Decks')
  .addOption(meaningSeparatorOption)
  .addOption(synonymSeparatorOption)
  .addOption(explanationBracketsOption)
  .action(commandInfo);

program
  .command('deck')
  .description(
    'Display information about one specific Anki Decks.\nUse optional options to show adiditonal information.',
  )
  .argument('<file>', 'File containing exported Anki Decks.')
  .argument(
    '<deck-name>',
    'Name of one Anki Deck. Either use full name, or append `*` to start of a name to indicate search by startsWith, when multiple decks match the beginning of the name, error is thrown.',
  )
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
  .argument('<file>', 'File containing exported Anki Decks.')
  .argument(
    '<deck-name>',
    'Name of one Anki Deck. Either use full name, or append `*` to start of a name to indicate search by startsWith, when multiple decks match the beginning of the name, error is thrown.',
  )
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
    ).choices(['card1', 'card2', 'both']),
  )
  .addOption(
    new Option(
      '--verify-meaning-separator-not-used <card>',
      'Verify that meaning separtor is not used, either in card1, card2 or both',
    ).choices(['card1', 'card2', 'both']),
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
      'It assumes that one deck is a general deck with tagged cards and the other is a deck specific for one particular tag.\n' +
      'For example the general deck has tags for `Nouns`, `Verbs`, `Adjectives`.\n' +
      'The specific deck is for Nouns (to practice also plural forms), or is for Verbs (to practice also past tense forms).\n' +
      'This command then enables to compare the two decks and see what is missing and what is different in the general deck or in the specific deck and vice versa.\n',
  )
  .argument('<file>', 'File containing exported Anki Decks.')
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
  .addOption(synonymSeparatorOption)
  .action(commandCompare);

console.log(figlet.textSync('Anki Analyzer'));
console.log('\n');

try {
  program.parse(process.argv);
} catch (err: any) {
  console.error(`Error occurred: ${err?.message ?? 'unknown'}`);
  process.exit(1);
}

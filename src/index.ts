import { Command, Option } from "commander";
import figlet from 'figlet';

import { commandInfo } from './commands/info/info';

const program = new Command();

program
  .name('anki-analyzer')
  .version('0.1.0', '-v, --version', 'Display current version')
  .description('App for analyzing exported Anki Decks')
  .option('-h, --help', 'Display help');

program
  .command('info')
  .description('Display basic information about exported Anki Decks.\nUse optional options to show adiditonal information.')
  .argument('<file>', 'File containing exported Anki Decks')
  .addOption(new Option('-m, --meaning-separator [separator]', 'Specify separator for `pieces of information`, like: `essen ;; to eat`, if none is used it defaults to `;;`'))
  .addOption(new Option('-s, --synonym-separator [separator]', 'Specify separator for synonyms, when one word has multiple translations, like: `to repel, to fight off` for `abwehren`, if none is used it defaults to `,`'))
  .addOption(new Option('-e, --explanation-brackets <bracket-type>', 'Specify type of brackets for additional explanation').choices(['round', 'square', 'curly']))
  .action(commandInfo);

console.log(figlet.textSync('Anki Analyzer'));

program.parse(process.argv);

if (process.argv.length < 3) {
  program.help();
  process.exit();
}

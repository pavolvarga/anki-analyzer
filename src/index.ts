import { Command } from 'commander';
import figlet from 'figlet';

import { commandInfo } from './commands/info';

const program = new Command();

program
  .name('anki-analyzer')
  .version('0.1.0', '-v, --version', 'Display current version')
  .description('App for analyzing exported Anki Decks')
  .option('-h, --help', 'Display help');

program
  .command('info')
  .description('Display basic information about exported Anki Decks')
  .argument('<file>', 'File containing exported Anki Decks')
  .action(commandInfo);

console.log(figlet.textSync('Anki Analyzer'));

program.parse(process.argv);

if (process.argv.length < 3) {
  program.help();
  process.exit();
}

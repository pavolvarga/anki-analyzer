import { Command } from 'commander';
import figlet from 'figlet';

const program = new Command();

program
  .name('anki-analyzer')
  .version('0.1.0', '-v, --version', 'Displays current version')
  .description('App for analyzing exported Anki Decks');

program
  .option('-h, --help', 'Displays help');

program.parse(process.argv);

console.log(figlet.textSync('Anki Analyzer'));

if (process.argv.length < 3) {
  program.help();
  process.exit();
}

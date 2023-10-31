import fs from 'fs';

type Record = {
  id: string;
  deckType: string;
  deckName: string;
  card1: string;
  card2: string;
  tags?: string[];
};

export function parse(fileName: string): void {
  if (!fs.existsSync(fileName)) {
    throw new Error(`Input file not found: ${fileName}`);
  }

  const wholeFile = fs.readFileSync(fileName, 'utf-8');
  wholeFile.split(/\r?\n/).forEach(line =>  {
    console.log(`Line from file: ${line}`);
  });  
}

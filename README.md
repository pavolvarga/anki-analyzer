# Anki Analyzer
Command line app for analyzing exported anki decks.

## Anki
[Anki](https://apps.ankiweb.net/) is a powerful application for flash cards. Ideal for example for learning a new language.<br/>
It enables an export of all decks into a multiple formats, including the CSV.<br/>

## Goal
The goal of this command line app is to read exported decks (in the form of a CSV file) and _analyze_ them.<br/>
To go beyond default counting of notes and cards a simple format of metadata is assumed to be used.

## Usage
App is written in [node.js](https://nodejs.org/en/), therefore you must install it.
You also must have **node** and **npm** executables on the **PATH**.

### Installation

Clone this repository:

```sh
git clone https://github.com/pavolvarga/anki-analyzer.git
```

Go to the directory:

```sh
cd anki-analyzer
```

Install dependencies:

```sh
npm install
```

Build:

```sh
npm run build
```

### Running

To print all command line options run:

```sh
node dist/index.js
```

or

```sh
node dist/index.js --help
```

# Licence
MIT
# Another Wordle Clone

Try it out at https://ncpleslie.github.io/wordle-clone/

## Why does this exist?

Because I like the game and wanted to keep playing.

## What is unique about this?

- You can change the word length. From 4 to 10 characters.
- You can even add a new language.

## Usage

To run this application, follow the commands found in `package.json`.

### Development

```
npm run dev
```

### Build

```
npm run build
```

## FAQ

### How do I change the word length?

`config.json` can be found in `./src/utils/`. From where you can alter the word length and the amount of attempts you can have.

### How do I change the language?

You'll need to find a dictionary for your language. Follow the structure of the `dictionary.json` file found in `./src/utils`

The keyboard can be updated in the same directory as `dictionary.json`. This is located in `keyboard.json`.

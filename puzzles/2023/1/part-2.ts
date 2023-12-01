import {Puzzle, input} from './shared';

const solve = (input: string): number => {
    const lines = Puzzle.parse(input);

    const overlapping: {[key: string]: string} = {
        'oneight': 'oneeight',
        'threeight': 'threeeight',
        'fiveight': 'fiveeight',
        'nineight': 'nineeight',
        'twone': 'twoone',
        'sevenine': 'sevennine',
        'eightwo': 'eighttwo',
    }

    const textToNumber: {[key: string]: string} = {
        'one': '1',
        'two': '2',
        'three': '3',
        'four': '4',
        'five': '5',
        'six': '6',
        'seven': '7',
        'eight': '8',
        'nine': '9',
    };

    const numbersOnly = lines
        .map(line => line
            .replaceAll(/(oneight|threeight|fiveight|nineight|twone|sevenine|eightwo)/g, (substring) => overlapping[substring])
            .replaceAll(/(one|two|three|four|five|six|seven|eight|nine)/g, (substring) => textToNumber[substring])
            .split('')
            .filter((x) => /[^a-z]$/.test(x))
            .join(''))
        .map(line => {
            const first = line[0];
            const last = line[line.length - 1];
            return parseInt(`${first}${last}`);
        });

    return numbersOnly.reduce((a, b) => a + b);
}

const result = solve(input);
console.log(`Result is ${result}`);

export {};

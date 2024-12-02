import {Frequencies, input} from './shared';

const solve = (input: string): number => {
    const frequencies = Frequencies.parse(input);
    return Frequencies.sum(frequencies);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

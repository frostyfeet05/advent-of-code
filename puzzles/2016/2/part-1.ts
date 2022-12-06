import {Code, input} from './shared';

const solve = (input: string): string => {
    const digitInstructions = Code.parse(input);
    let lastDigit = 5;

    return digitInstructions.map(instructions => {
        lastDigit = Code.findDigit(instructions, lastDigit);
        return lastDigit;
    }).join('');
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

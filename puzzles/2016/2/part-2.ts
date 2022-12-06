import {Code, input} from './shared';

const solve = (input: string): string => {
    const digitInstructions = Code.parse(input);
    let lastDigit = {x: 0, y: 2, digit: 5};

    return digitInstructions.map(instructions => {
        lastDigit = Code.findAdvancedDigit(instructions, lastDigit);
        return lastDigit.digit.toString(16);
    }).join('').toUpperCase();
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

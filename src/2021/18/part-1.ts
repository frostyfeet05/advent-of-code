import {input, processInput, Snailfish} from './shared';

const solve = (input: string): number => {
    const snailfishes = processInput(input);

    const sum = snailfishes.reduce((result, value) => Snailfish.add(result, value));
    const magnitude = Snailfish.magnitude(sum);
    console.log('magnitude', Snailfish.toString(magnitude));

    return magnitude[0].value;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

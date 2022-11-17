import {input, Toboggan} from '../shared';

const solve = (input: string): number => {
    const map = Toboggan.parse(input);
    return Toboggan.countTreesUntilBottom(map, 3);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

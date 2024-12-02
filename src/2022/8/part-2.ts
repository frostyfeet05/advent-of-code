import {input, Trees} from './shared';

const solve = (input: string): number => {
    const trees = Trees.parse(input);
    return Trees.calculateHighestScenicScore(trees);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

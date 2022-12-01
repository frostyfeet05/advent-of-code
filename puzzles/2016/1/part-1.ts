import {Grid, input} from './shared';

const solve = (input: string): number => {
    const grid = Grid.parse(input);
    return Grid.countDistance(grid);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

import {input, Toboggan} from './shared';

type Slope = { x: number, y?: number };

const solve = (input: string): number => {
    const map = Toboggan.parse(input);
    return [
        {x: 1},
        {x: 3},
        {x: 5},
        {x: 7},
        {x: 1, y: 2},
    ].reduce((total: number, slope: Slope) => {
        return total * Toboggan.countTreesUntilBottom(map, slope.x, slope.y);
    }, 1);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

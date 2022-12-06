import {input, Triangle} from './shared';

const solve = (input: string): number => {
    const triangles = Triangle.parseAdvanced(input);
    return triangles
        .filter(triangle => Triangle.valid(triangle))
        .length;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

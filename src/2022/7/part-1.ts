import {FileSystem, input} from './shared';

const solve = (input: string): number => {
    const root = FileSystem.parse(input);
    const sizes: number[] = FileSystem.getDirectorySizes(root);
    return sizes.filter(size => size <= 100_000).reduce((sum, size) => sum + size);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

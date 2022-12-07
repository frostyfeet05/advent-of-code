import {FileSystem, input} from './shared';

const totalSize = 70_000_000;
const neededSize = 30_000_000;

const solve = (input: string): number => {
    const root = FileSystem.parse(input);
    const sizes = FileSystem.getDirectorySizes(root);
    const usedSpace = FileSystem.calculateDirSize(root);
    const neededSpace = neededSize - (totalSize - usedSpace);
    return sizes
        .filter(size => size >= neededSpace)
        .sort((a, b) => a - b)[0];
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

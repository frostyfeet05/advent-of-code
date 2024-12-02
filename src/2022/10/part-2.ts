import {CPU, input} from './shared';

const solve = (input: string): void => {
    const instructions = CPU.parse(input);
    CPU.draw(instructions);
};

solve(input);

export {};

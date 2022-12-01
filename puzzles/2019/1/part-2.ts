import {input, Modules} from './shared';

const solve = (input: string): number => {
    const modules = Modules.parse(input);
    return Modules.calculateTotalFuel(modules);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

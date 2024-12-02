import {input, Modules} from './shared';

const solve = (input: string): number => {
    const modules = Modules.parse(input);
    return Modules.calculateFuelForModules(modules);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

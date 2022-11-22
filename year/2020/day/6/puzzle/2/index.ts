import {CustomFormGroup, input} from '../shared';

const solve = (input: string): number => {
    const groups = CustomFormGroup.parse(input);
    return groups.reduce((sum, group) => sum + CustomFormGroup.countCommonAnsers(group), 0);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

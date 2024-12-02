import {input, Stack} from './shared';

const solve = (input: string): string => {
    let {stacks, instructions} = Stack.parse(input);
    instructions.forEach(instruction => stacks = Stack.executeInstruction(stacks, instruction, false));

    return stacks
        .map(stack => stack.pop())
        .join('');
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

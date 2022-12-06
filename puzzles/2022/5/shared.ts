export const input = ``;

type Instruction = {
    take: number;
    from: number;
    to: number;
}

type Stack = string[];

export const Stack = {
    parse: (input: string): { stacks: Stack[], instructions: Instruction[] } => {
        const [stackStr, instructionStr] = input.split('\n\n');

        const stacks: Stack[] = parseStacks(stackStr);
        const instructions: Instruction[] = parseInstructions(instructionStr);

        return {stacks, instructions};
    },
    executeInstruction: (stacks: Stack[], instruction: Instruction, oneAtATime: boolean = true): Stack[] => {
        const newStacks = stacks.map(stack => [...stack]);

        const from = instruction.from - 1;
        const to = instruction.to - 1;

        if (oneAtATime) {
            for (let i = 0; i < instruction.take; i++) {
                newStacks[to].push(newStacks[from].pop() as string);
            }
        } else {
            const crates = newStacks[from].splice(newStacks[from].length - instruction.take);
            newStacks[to] = [...newStacks[to], ...crates];
        }

        return newStacks;
    }
};

const parseStacks = (input: string): Stack[] => {
    const stacks: string[][] = [];
    input.split('\n')
        .slice(0, -1)
        .map(line => {
            line.split('').reduce((crates: string[][], value, index) => {
                if (value === ' ' || value === '[' || value === ']') {
                    return crates;
                }
                const crate = Math.floor(index / 4);
                crates[crate] = [...(crates[crate] || []), value];
                return crates;
            }, stacks);
        });

    stacks.map(stack => stack.reverse());
    return stacks;
};

const parseInstructions = (input: string): Instruction[] => {
    return input.split('\n').map(instruction => {
        const matches = instruction.match(/move (\d+) from (\d) to (\d)/) || [];
        return {take: parseInt(matches[1]), from: parseInt(matches[2]), to: parseInt(matches[3])};
    });
};

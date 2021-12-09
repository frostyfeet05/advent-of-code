const input = ``;

const processInput = (input: string): number[] => {
    return input.split('\n').map(Number);
};

const solve = (input: string): number => {
    const lines = processInput(input);
    return lines
        .map((value, index, array) => value + array[index + 1] + array[index + 2])
        .filter((value, index, array) => value > array[index - 1]).length;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

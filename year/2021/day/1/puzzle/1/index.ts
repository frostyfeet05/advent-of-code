const input = ``;

const processInput = (input: string): number[] => {
    return input.split('\n').map(Number);
};

const doPuzzle = (input: string): number => {
    const lines = processInput(input);
    return lines.filter((value, index, array) => value > array[index - 1]).length;
};

const result = doPuzzle(input);
console.log(`Result is ${result}`);

export {}

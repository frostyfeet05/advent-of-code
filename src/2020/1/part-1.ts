const input = '';

const processInput = (input: string): number[] => {
    return input.split('\n').map(Number);
};

const solve = (input: string): number => {
    const lines = processInput(input);
    const size = lines.length;

    for (let x = 0; x < size - 1; x++) {
        for (let y = x + 1; y < size; y++) {
            if (lines[x] + lines[y] === 2020) {
                return lines[x] * lines[y];
            }
        }
    }

    return 0;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

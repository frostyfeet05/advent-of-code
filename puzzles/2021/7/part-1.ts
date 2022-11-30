const input = ``;

const processInput = (input: string): number[] => {
    return input.split(',').map(Number);
};

const calculateFuel = (positions: number[], to: number) => {
    return positions.map(x => Math.abs(x - to)).reduce((a, b) => a + b);
};

const calculateMin = (list: number[]): number => {
    return list.reduce((a, b) => Math.min(a, b));
}

const calculateMax = (list: number[]): number => {
    return list.reduce((a, b) => Math.max(a, b));
}

const solve = (input: string): number => {
    const positions = processInput(input);

    const max = calculateMax(positions);
    const fuels = Array.from({length: max + 1}, (_, b) => b).map(x => calculateFuel(positions, x));
    return calculateMin(fuels);
}

const result = solve(input);
console.log(`Result is ${result}`);

export {};

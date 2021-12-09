const input = ``;

interface Bits {
    zero: number;
    one: number;
}

const processInput = (input: string): string[][] => {
    return input.split('\n').map(x => x.split(''));
};

const calculateMostCommon = (input: string[][], index: number): string => {
    const bits = calculateBits(input, index);
    return bits.one >= bits.zero ? '1' : '0';
};

const calculateLeastCommon = (input: string[][], index: number): string => {
    const bits = calculateBits(input, index);
    return bits.one >= bits.zero ? '0' : '1';
};

const calculateBits = (input: string[][], index: number): Bits => {
    const one = input.filter(x => x[index] === '1').length;
    const zero = input.length - one;
    return {zero, one};
};

const calculateValue = (input: string[][], size: number, func: (a: string[][], b: number) => string, index: number = 0): string[] => {
    if (input.length === 1) {
        return input[0];
    }
    if (index === size) {
        throw new Error('Something wrong here');
    }
    const valueCheck = func(input, index);
    const result = input.filter(x => x[index] === valueCheck);
    return calculateValue(result, size, func, index + 1);
}

const solve = (input: string): number => {
    const lines = processInput(input);
    const size = lines[0].length;
    const oxygen = calculateValue(lines, size, calculateMostCommon);
    const co2 = calculateValue(lines, size, calculateLeastCommon);

    return parseInt(oxygen.join(''), 2) * parseInt(co2.join(''), 2);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

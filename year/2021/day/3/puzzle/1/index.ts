const input = ``;

const processInput = (input: string): string[] => {
    return input.split('\n');
}

const calculateGamma = (input: string[]): number[] => {
    return [...Array(input[0].length)].map((_, i) => getCipher(input.map(x => x[i])));
}

const calculateEpsilon = (gamma: number[]): number[] => {
    return gamma.map(x => 1 - x);
}

const getCipher = (input: string[]): number => {
    const one = input.filter(x => x === '1').length;
    const zero = input.length - one;
    return one > zero ? 1 : 0;
}

const solve = (input: string): number => {
    const lines = processInput(input);
    const gamma = calculateGamma(lines);
    const epsilon = calculateEpsilon(gamma);

    return parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);
}

const result = solve(input);
console.log(`Result is ${result}`);

export {}

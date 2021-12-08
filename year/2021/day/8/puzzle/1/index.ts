const input = ``;

const UNIQUE_SIZES: number[] = [2, 3, 4, 7];

interface Line {
    inputs: string[];
    outputs: string[];
}

const Line = {
    parse(inputStr: string): Line {
        const [inputs, outputs] = inputStr.split(' | ').map(x => x.split(' '));
        return {inputs, outputs};
    }
};

const processInput = (input: string): Line[] => {
    return input.split('\n').map(Line.parse);
};

const doPuzzle = (input: string): number => {
    const lines = processInput(input);
    return lines.map(line => line.outputs.filter(out => UNIQUE_SIZES.indexOf(out.length) > -1).length)
        .reduce((a, b) => a + b);
};

const result = doPuzzle(input);
console.log(`Result is ${result}`);

export {};

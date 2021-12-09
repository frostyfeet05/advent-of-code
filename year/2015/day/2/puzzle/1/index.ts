const input = ``;

interface Present {
    length: number;
    width: number;
    height: number;
}

const Present = {
    parse(input: string): Present {
        const [l,w,h] = input.split('x').map(Number);
        return {length: l, width: w, height: h};
    }
}

const processInput = (input: string): Present[] => {
    return input.split('\n').map(Present.parse);
}

const calculateWrappingPaper = (present: Present): number => {
    const sides = [present.length * present.width, present.width * present.height, present.height * present.length];
    const extra = sides.reduce((a, b) => Math.min(a, b));
    const totalSides = sides.reduce((a, b) => a + b) * 2;
    return totalSides + extra;
}

const solve = (input: string): number => {
    const presents = processInput(input);
    const wrapping = presents.map(calculateWrappingPaper);
    return wrapping.reduce((a, b) => a + b);
}

const result = solve(input);
console.log(`Result is ${result}`);

export {};

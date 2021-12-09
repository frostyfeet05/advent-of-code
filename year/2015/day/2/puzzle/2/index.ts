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

const calculateRibbon = (present: Present): number => {
    const sides = [present.length, present.width, present.height];
    const ribbon = sides.sort((a, b) => a - b).slice(0, 2).reduce((a, b) => a + b) * 2;
    const bow = sides.reduce((a, b) => a * b);
    return ribbon + bow;
}

const solve = (input: string): number => {
    const presents = processInput(input);
    const ribbon = presents.map(calculateRibbon);
    return ribbon.reduce((a, b) => a + b);
}

const result = solve(input);
console.log(`Result is ${result}`);

export {};

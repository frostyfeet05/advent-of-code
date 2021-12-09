const input = ``;

interface Line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

const Line = {
    parse(input: string): Line {
        const [[x1, y1], [x2, y2]] = input.split(' -> ').map(x => x.split(',').map(Number));
        return {x1, y1, x2, y2};
    }
};

const processInput = (input: string): Line[] => {
    return input.split('\n').map(Line.parse);
};

const interpolate = (line: Line): string[] => {
    let points: string[] = [];
    if (line.x1 === line.x2) {
        points = interpolateArray(line.y1, line.y2).map(y => `${line.x1},${y}`);
    } else if (line.y1 === line.y2) {
        points = interpolateArray(line.x1, line.x2).map(x => `${x},${line.y1}`);
    } else {
        const x = interpolateArray(line.x1, line.x2);
        const y = interpolateArray(line.y1, line.y2);
        points = x.map((v, i) => `${v},${y[i]}`);
    }
    return points;
}

const interpolateArray = (from: number, to: number): number[] => {
    const length = Math.abs(to - from) + 1;
    const startAt = Math.min(from, to);
    const range = Array.from({length}, (x, i) => startAt + i);
    if (to < from) {
        return range.reverse();
    }
    return range;
}

const solve = (input: string): number => {
    const lines = processInput(input);
    const result: string[] = lines.map(line => interpolate(line)).flat();

    return Object.values(result.reduce((a: any[], b: any) => (a[b] = a[b] + 1 || 1, a), []))
        .filter(x => x > 1)
        .length;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

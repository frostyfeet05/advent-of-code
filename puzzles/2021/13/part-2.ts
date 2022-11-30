const input = ``;

interface Point {
    x: number;
    y: number;
}

type FoldDirection = 'x' | 'y';

interface Fold {
    direction: FoldDirection;
    position: number;
}

const Point = {
    parse(input: string): Point {
        const [x, y] = input.split(',').map(Number);
        return {x, y};
    }
};

const Fold = {
    parse(input: string): Fold {
        const [direction, position] = input.split(' ')[2].split('=');
        return {direction: direction as FoldDirection, position: parseInt(position)};
    }
};

const processInput = (input: string): {points: Set<Point>, folds: Fold[]} => {
    const [pointsStr, foldsStr] = input.split('\n\n');
    const points = new Set<Point>(pointsStr.split('\n').map(Point.parse));
    const folds = foldsStr.split('\n').map(Fold.parse);

    return {points, folds};
};

const fold = (points: Set<Point>, fold: Fold): Set<Point> => {
    const folded = Array.from(points).map(p => {
        const point = Object.assign({}, p);
        if (point[fold.direction] > fold.position) {
            point[fold.direction] = fold.position - (point[fold.direction] - fold.position);
        }
        return point;
    });

    return new Set<Point>(folded);
}

type Dots = '.' | '#';

const solve = (input: string): string => {
    const {points, folds} = processInput(input);

    let folded = new Set<Point>(points);
    folds.forEach(f => folded = fold(folded, f));

    const width = Array.from(folded).map(p => p.x).reduce((a, b) => Math.max(a, b)) + 1;
    const height = Array.from(folded).map(p => p.y).reduce((a, b) => Math.max(a, b)) + 1;

    const result: Dots[][] = Array.from({length: height}, () => Array.from({length: width}, () => '.'));
    folded.forEach(p => result[p.y][p.x] = '#');

    return result.map(line => line.join('')).reduce((a, b) => `${a}\n${b}`);
};

const result = solve(input);
console.log(`Result is`)
console.log(result);

export {};

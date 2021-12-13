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

const fold = (points: Set<Point>, fold: Fold): Set<string> => {
    const folded = Array.from(points).map(p => {
        const point = Object.assign({}, p);
        if (point[fold.direction] > fold.position) {
            point[fold.direction] = fold.position - (point[fold.direction] - fold.position);
        }
        return `${point.x},${point.y}`;
    });

    return new Set<string>(folded);
}


const solve = (input: string): number => {
    const {points, folds} = processInput(input);
    const folded = fold(points, folds[0]);

    return folded.size;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

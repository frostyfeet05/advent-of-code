export const input = ``;

type Vector = {x: number, y: number};
type Direction = 'U' | 'D' | 'L' | 'R';
type Movement = {
    direction: Direction;
    amount: number;
};

const Vector = {
    new: (): Vector => ({x: 0, y: 0}),
    sum: (v1: Vector, v2: Vector): Vector => ({x: v1.x + v2.x, y: v1.y + v2.y}),
    toString: (position: Vector) => `${position.x},${position.y}`,
    move: (position: Vector, direction: Direction): Vector => {
        switch (direction) {
        case 'U':
            return {...position, y: position.y - 1};
        case 'D':
            return {...position, y: position.y + 1};
        case 'L':
            return {...position, x: position.x - 1};
        case 'R':
            return {...position, x: position.x + 1};
        }
    }
}

export const Motion = {
    parse: (input: string): Movement[] => {
        return input.split('\n').map(line => {
            const [direction, amount] = line.split(' ');
            return {direction: direction as Direction, amount: parseInt(amount)};
        });
    },
    countUniqueTailPositions: (movements: Movement[]): number => {
        let head = Vector.new();
        let tail = Vector.new();
        let occurrences: {[key: string]: number} = addToOccurrences(tail, {});

        movements.forEach(movement => {
            for (let i = 0; i < movement.amount; i++) {
                head = Vector.move(head, movement.direction);
                // check for tail movement
                // keep hold of tail positions + count them
                if (tailShouldMove(head, tail)) {
                    tail = calculateNextTailPosition(head, tail);
                    occurrences = addToOccurrences(tail, occurrences);
                }
            }
        });

        return Object.keys(occurrences).length;
    },
    countUniqueLongTailPositions: (movements: Movement[]): number => {
        const rope = [...Array(10).keys()].map(() => Vector.new());
        let occurrences: {[key: string]: number} = addToOccurrences(rope[9], {});

        movements.forEach(movement => {
            for (let i = 0; i < movement.amount; i++) {
                // move the head
                rope[0] = Vector.move(rope[0], movement.direction);

                for (let r = 1; r < rope.length; r++) {
                    if (tailShouldMove(rope[r - 1], rope[r])) {
                        rope[r] = calculateNextTailPosition(rope[r - 1], rope[r]);
                        if (r === rope.length - 1) {
                            occurrences = addToOccurrences(rope[r], occurrences);
                        }
                    } else {
                        break;
                    }
                }
            }
        });

        return Object.keys(occurrences).length;
    }
};

const tailShouldMove = (head: Vector, tail: Vector): boolean => {
    return Math.abs(head.x - tail.x) >= 2 || Math.abs(head.y - tail.y) >= 2;
}

const calculateNextTailPosition = (head: Vector, tail: Vector): Vector => {
    let delta = Vector.new();
    delta.x += roundToNextInt(head.x, tail.x);
    delta.y += roundToNextInt(head.y, tail.y);
    return Vector.sum(tail, delta);
}

const addToOccurrences = (position: Vector, occurrences: { [key: string]: number }):{ [key: string]: number } => {
    const key = Vector.toString(position);
    return {
        ...occurrences,
        [key]: (occurrences[key] || 0) + 1,
    };
}

const roundToNextInt = (first: number, second: number): number => {
    const diff = (first - second) / 2;
    return Math.sign(diff) > 0 ? Math.ceil(diff) : Math.floor(diff);
}

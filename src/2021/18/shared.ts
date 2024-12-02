export const input = ``;

type SnailfishPart = { value: number, level: number };
export type Snailfish = SnailfishPart[];
type Pair = [Pair | number, Pair | number];

const convertPairToSnail = (pair: Pair, level: number = 1): Snailfish => {
    const snailfish: Snailfish = [];
    const left = pair[0];
    const right = pair[1];

    if (typeof left === 'number') {
        snailfish.push({value: left, level});
    } else {
        snailfish.push(...convertPairToSnail(left, level + 1));
    }
    if (typeof right === 'number') {
        snailfish.push({value: right, level});
    } else {
        snailfish.push(...convertPairToSnail(right, level + 1));
    }

    return snailfish;
};

export const Snailfish = {
    parse: (input: string): Snailfish => convertPairToSnail(JSON.parse(input) as Pair, 1),
    add: (left: Snailfish, right: Snailfish): Snailfish => {
        let sum = [...left, ...right].map(snail => ({value: snail.value, level: snail.level + 1}));

        console.log('after addition', Snailfish.toString(sum));

        while (Snailfish.canExplode(sum) || Snailfish.canSplit(sum)) {
            while (Snailfish.canExplode(sum)) {
                sum = Snailfish.explode(sum);
                console.log('after explode', Snailfish.toString(sum));
            }

            if (Snailfish.canSplit(sum)) {
                sum = Snailfish.split(sum);
                console.log('after split', Snailfish.toString(sum));
            }
        }

        return sum;
    },
    canExplode: (snail: Snailfish): boolean => snail.filter(x => x.level > 4).length > 0,
    explode: (snail: Snailfish): Snailfish => {
        const index = snail.findIndex(s => s.level > 4);
        if (index < 0) {
            return snail;
        }

        const newSnail = [...snail];

        // left side of pair
        if (index > 0) {
            newSnail[index - 1].value += newSnail[index].value;
        }

        // right side of pair
        if (index < snail.length - 2) {
            newSnail[index + 2].value += newSnail[index + 1].value;
        }

        // replace pair with zero with a lower level
        newSnail.splice(index, 2, {value: 0, level: newSnail[index].level - 1});

        return newSnail;
    },
    canSplit: (snail: Snailfish): boolean => snail.filter(x => x.value > 9).length > 0,
    split: (snail: Snailfish): Snailfish => {
        const index = snail.findIndex(s => s.value > 9);
        if (index < 0) {
            return snail;
        }

        const newSnail = [...snail];

        const leftValue = Math.floor(snail[index].value / 2);
        const rightValue = Math.ceil(snail[index].value / 2);
        const newLevel = snail[index].level + 1;

        // replace value with new pair
        newSnail.splice(index, 1, {value: leftValue, level: newLevel}, {value: rightValue, level: newLevel});
        return newSnail;
    },
    toString: (snail: Snailfish): string => {
        return JSON.stringify(snail.map(s => s.value));
    },
    magnitude: (snail: Snailfish, level: number = 4): Snailfish => {
        // checked all levels, return 0 as final
        if (level === 0) {
            return snail;
        }

        // find next value in level
        const index = snail.findIndex(s => s.level === level);
        if (index < 0) {
            return Snailfish.magnitude(snail, level - 1);
        }

        const magnitudeLeft = snail[index].value * 3;
        const magnitudeRight = snail[index + 1].value * 2;
        const magnitude = magnitudeLeft + magnitudeRight;

        const newSnail = [...snail];

        // replace pair with magnitude with a lower level
        newSnail.splice(index, 2, {value: magnitude, level: level - 1})

        return Snailfish.magnitude(newSnail, level);
    }
};

export const processInput = (input: string): Snailfish[] => {
    return input.split('\n').map(Snailfish.parse);
};

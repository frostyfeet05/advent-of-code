export const input = ``;

type Range = {from: number, to: number};
type Pair = {first: Range, second: Range};

export const Assignments = {
    parse: (input: string): Pair[] => {
        return input.split('\n').map(pair => {
            const [first, second] = pair.split(',').map(range => {
                const [from, to] = range.split('-').map(Number);
                return {from, to};
            });
            return {first, second};
        })
    },
    isFullyContained: (pair: Pair): boolean => {
        return isFullyContained(pair.first, pair.second) || isFullyContained(pair.second, pair.first);
    },
    overlap: (pair: Pair): boolean => {
        return overlap(pair.first, pair.second);
    }
}

const isFullyContained = (a: Range, b: Range): boolean => {
    return a.from <= b.to && a.to >= b.from &&
        a.from >= b.from && a.to <= b.to;
}

const overlap = (a: Range, b: Range): boolean => {
    return a.from <= b.to && a.to >= b.from;
}

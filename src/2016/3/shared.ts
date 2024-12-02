export const input = ``;

type Triangle = {
    side1: number;
    side2: number;
    side3: number;
};

export const Triangle = {
    parse: (input: string): Triangle[] => {
        return input.split('\n').map(triangle => {
            const sides = triangle.match(/(\d+) *(\d+) *(\d+)/) || [];
            return {side1: parseInt(sides[1]), side2: parseInt(sides[2]), side3: parseInt(sides[3])};
        });
    },
    parseAdvanced: (input: string): Triangle[] => {
        return input
            .split('\n')
            .reduce((groups: string[][], row, index) => {
                const group = Math.floor(index / 3);
                groups[group] = [...(groups[group] || []), row];
                return groups;
            }, [])
            .flatMap(group => {
                const digits = group.map(row => {
                    const sides = row.match(/(\d+) *(\d+) *(\d+)/) || [];
                    return [parseInt(sides[1]), parseInt(sides[2]), parseInt(sides[3])];
                });
                return [
                    {side1: digits[0][0], side2: digits[1][0], side3: digits[2][0]},
                    {side1: digits[0][1], side2: digits[1][1], side3: digits[2][1]},
                    {side1: digits[0][2], side2: digits[1][2], side3: digits[2][2]},
                ]
            });
    },
    valid: (triangle: Triangle): boolean => {
        return [
            {side1: triangle.side1, side2: triangle.side2, side3: triangle.side3},
            {side1: triangle.side1, side2: triangle.side3, side3: triangle.side2},
            {side1: triangle.side2, side2: triangle.side1, side3: triangle.side3},
            {side1: triangle.side2, side2: triangle.side3, side3: triangle.side1},
            {side1: triangle.side3, side2: triangle.side1, side3: triangle.side2},
            {side1: triangle.side3, side2: triangle.side2, side3: triangle.side1},
        ].every(tri => validTriangle(tri.side1, tri.side2, tri.side3));
    }
};

const validTriangle = (side1: number, side2: number, side3: number): boolean => {
    return (side1 + side2) > side3;
};

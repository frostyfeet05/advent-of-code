export const input = ``;

type TobogganMap = ('.' | '#')[][];

export const Toboggan = {
    parse: (input: string): TobogganMap => {
        return input
            .split('\n')
            .map(line => line.split('') as ('.' | '#')[]);
    },
    countTreesUntilBottom: (map: TobogganMap, slopeX: number, slopeY: number = 1): number => {
        let x = 0;
        return map.reduce((trees: number, line, index) => {
            if (index % slopeY !== 0) return trees;
            let newTrees = trees;

            if (line[x] === '#') {
                newTrees = trees + 1;
            }
            x = (x + slopeX) % line.length;
            return newTrees;
        }, 0);
    }
}

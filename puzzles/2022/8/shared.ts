export const input = ``;

type Trees = number[][];

export const Trees = {
    parse: (input: string): Trees => {
        return input.split('\n').map(row => row.split('').map(Number));
    },
    countVisible: (trees: Trees): number => {
        return trees.reduce((superTotal: number, row, rowIndex) => {
            return superTotal + row.reduce((total: number, tree, colIndex) => {
                return total + (isVisible(colIndex, rowIndex, trees) ? 1 : 0);
            }, 0);
        }, 0);
    },
    calculateHighestScenicScore: (trees: Trees): number => {
        const scores = [];
        for (let y = 1; y < trees.length - 1; y++) {
            for (let x = 1; x < trees[y].length - 1; x++) {
                scores.push(calculateScenicScore(x, y, trees));
            }
        }
        return scores.reduce((max, score) => Math.max(max, score), 0);
    }
}

const isVisible = (x: number, y: number, trees: Trees): boolean => {
    const width = trees[0].length;
    const height = trees.length;

    // edge is always visible
    if (y === 0 || y === height - 1 || x === 0 || x === width - 1) {
        return true;
    }

    // check column and row
    const treeHeight = trees[y][x];
    const row: number[] = trees[y];
    const column: number[] = trees.map(row => row[x]);

    const left = row.slice(0, x).every(tree => treeHeight > tree);
    const right = row.slice(x + 1).every(tree => treeHeight > tree);
    const top = column.slice(0, y).every(tree => treeHeight > tree);
    const bottom = column.slice(y + 1).every(tree => treeHeight > tree);

    return [left, right, top, bottom].filter(Boolean).length > 0;
}

const calculateScenicScore = (x: number, y: number, trees: Trees): number => {
    // check column and row
    const treeHeight = trees[y][x];
    const row: number[] = trees[y];
    const column: number[] = trees.map(row => row[x]);

    const left = row.slice(0, x).reverse();
    const right = row.slice(x + 1);
    const top = column.slice(0, y).reverse();
    const bottom = column.slice(y + 1);

    return lengthOfLineOfSight(treeHeight, left)
        * lengthOfLineOfSight(treeHeight, right)
        * lengthOfLineOfSight(treeHeight, top)
        * lengthOfLineOfSight(treeHeight, bottom);
}

const lengthOfLineOfSight = (maxTreeHeight: number, trees: number[]): number => {
    const index = trees.findIndex(tree => tree >= maxTreeHeight);
    return index === -1 ? trees.length : index + 1;
}
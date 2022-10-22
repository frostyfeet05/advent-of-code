const input = ``;

interface PairInsertion {
    input: string;
    output: string;
}

interface PairReplacements {
    original: string;
    replacement: string;
}

const PairInsertion = {
    parse(insertion: string): PairInsertion {
        const [input, output] = insertion.split(' -> ');
        return {input, output};
    }
};

const processInput = (input: string): { template: string, insertions: PairInsertion[] } => {
    const [template, insertionsStr] = input.split('\n\n');
    const insertions = insertionsStr.split('\n').map(PairInsertion.parse);
    return {template, insertions};
};

const insertPairs = (template: string, insertions: PairInsertion[]): string => {
    const pairs = template.split('').reduce((pairs: string[], value: string, index: number, array: string[]) => {
        if (index < array.length - 1) {
            pairs.push(array.slice(index, index + 2).join(''));
        }
        return pairs;
    }, []);

    const insertedPairs: PairReplacements[] = pairs.map(pair => {
        const matchedInsertion = insertions.find(insertion => insertion.input === pair);
        if (!matchedInsertion) {
            throw new Error(`No matching insertion found for pair ${pair}`);
        }
        const inserted = pair.split('');
        inserted.splice(1, 0, matchedInsertion.output);
        return {original: pair, replacement: inserted.join('')};
    });

    let polymer = template;
    insertedPairs.forEach(pair => polymer = polymer.replace(pair.original, pair.replacement));
    return polymer;
};

const countElements = (polymer: string): { [element: string]: number } => {
    const result: { [element: string]: number } = {};
    polymer.split('').forEach(element => {
        result[element] = (result[element] || 0) + 1;
    });
    return result;
};

const solve = (input: string): number => {
    const {template, insertions} = processInput(input);

    let polymer = template;
    for (let i = 0; i < 10; i++) {
        polymer = insertPairs(polymer, insertions);
    }

    const elements = countElements(polymer);
    const min = Object.values(elements).reduce((a, b) => Math.min(a, b));
    const max = Object.values(elements).reduce((a, b) => Math.max(a, b));

    return max - min;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

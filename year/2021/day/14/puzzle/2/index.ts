// https://blog.cristiana.tech/advent-of-code-2021-day-14

const input = ``;

type InsertionRules = { [key: string]: string };
type OccurenceMap = { [key: string]: number };

const convertToPairs = (template: string): string[] => {
    return template
        .split('')
        .reduce((pairs: string[], value: string, index: number, array: string[]) => {
            if (index < array.length - 1) {
                return [...pairs, array.slice(index, index + 2).join('')];
            }
            return [];
        }, []);
};

const getPairOccurenceMap = (template: string): OccurenceMap => {
    return template
        .split('')
        .reduce((counter: OccurenceMap, value: string, index: number, array: string[]) => {
            if (index < array.length - 1) {
                const pair = array.slice(index, index + 2).join('');
                return addToOccurenceMap(pair, counter);
            }
            return counter;
        }, {});
};

const addToOccurenceMap = (value: string, occurenceMap: OccurenceMap, amount: number = 1): OccurenceMap => {
    return {
        ...occurenceMap,
        [value]: (occurenceMap[value] || 0) + amount
    };
};

const updateOccurenceMap = (rules: InsertionRules, occurenceMap: OccurenceMap): OccurenceMap => {
    return Object
        .keys(occurenceMap)
        .reduce((newOccurences: OccurenceMap, pair: string) => {
            let tempOccurences = {...newOccurences};

            const amount = occurenceMap[pair];
            const polymer = rules[pair];

            if (polymer) {
                const pair1 = `${pair.charAt(0)}${polymer}`;
                const pair2 = `${polymer}${pair.charAt(1)}`;
                tempOccurences = addToOccurenceMap(pair1, tempOccurences, amount);
                tempOccurences = addToOccurenceMap(pair2, tempOccurences, amount);
            } else {
                tempOccurences = addToOccurenceMap(pair, tempOccurences, amount);
            }
            return tempOccurences;
        }, {});
};

const getPolymerOccurenceMap = (pairOccurenceMap: OccurenceMap, template: string): OccurenceMap => {
    const occurenceMap: OccurenceMap = Object
        .keys(pairOccurenceMap)
        .reduce((polymerOccurenceMap: OccurenceMap, pair: string) => {
            let newOccurenceMap = {...polymerOccurenceMap};
            newOccurenceMap = addToOccurenceMap(pair.charAt(0), newOccurenceMap, pairOccurenceMap[pair]);
            newOccurenceMap = addToOccurenceMap(pair.charAt(1), newOccurenceMap, pairOccurenceMap[pair]);
            return newOccurenceMap;
        }, {});

    occurenceMap[template.charAt(0)]++;
    occurenceMap[template.charAt(template.length - 1)]++;

    Object.keys(occurenceMap).forEach(key => occurenceMap[key] = Math.floor(occurenceMap[key] / 2));
    return occurenceMap;
}

const processInput = (input: string): { template: string, insertionRules: InsertionRules } => {
    const [template, insertionStrings] = input.split('\n\n');
    const insertionRules = insertionStrings
        .split('\n')
        .reduce((insertions, pair) => {
            const [input, output] = pair.split(' -> ');
            return {
                ...insertions,
                [input]: output
            };
        }, {} as InsertionRules);
    return {template, insertionRules};
};

const solve = (input: string): number => {
    const {template, insertionRules} = processInput(input);
    console.log('Template', template, insertionRules);

    let pairOccurenceMap = getPairOccurenceMap(template);
    console.log(pairOccurenceMap);

    for (let i = 0; i < 40; i++) {
        pairOccurenceMap = updateOccurenceMap(insertionRules, pairOccurenceMap);
        console.log('Step', i + 1, pairOccurenceMap);
    }

    const polymerOccurenceMap = getPolymerOccurenceMap(pairOccurenceMap, template);

    const min = Object.values(polymerOccurenceMap).reduce((a, b) => Math.min(a, b));
    const max = Object.values(polymerOccurenceMap).reduce((a, b) => Math.max(a, b));

    return max - min;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

// https://blog.cristiana.tech/advent-of-code-2021-day-14

const input = ``;

type InsertionRules = { [key: string]: string };
type OccurrenceMap = { [key: string]: number };

const getPairOccurrenceMap = (template: string): OccurrenceMap => {
    return template
        .split('')
        .reduce((counter: OccurrenceMap, value: string, index: number, array: string[]) => {
            if (index < array.length - 1) {
                const pair = array.slice(index, index + 2).join('');
                return addToOccurrenceMap(pair, counter);
            }
            return counter;
        }, {});
};

const addToOccurrenceMap = (value: string, occurrenceMap: OccurrenceMap, amount: number = 1): OccurrenceMap => {
    return {
        ...occurrenceMap,
        [value]: (occurrenceMap[value] || 0) + amount
    };
};

const updateOccurrenceMap = (rules: InsertionRules, occurrenceMap: OccurrenceMap): OccurrenceMap => {
    return Object
        .keys(occurrenceMap)
        .reduce((newOccurrences: OccurrenceMap, pair: string) => {
            let tempOccurrences = {...newOccurrences};

            const amount = occurrenceMap[pair];
            const polymer = rules[pair];

            if (polymer) {
                const pair1 = `${pair.charAt(0)}${polymer}`;
                const pair2 = `${polymer}${pair.charAt(1)}`;
                tempOccurrences = addToOccurrenceMap(pair1, tempOccurrences, amount);
                tempOccurrences = addToOccurrenceMap(pair2, tempOccurrences, amount);
            } else {
                tempOccurrences = addToOccurrenceMap(pair, tempOccurrences, amount);
            }
            return tempOccurrences;
        }, {});
};

const getPolymerOccurrenceMap = (pairOccurrenceMap: OccurrenceMap, template: string): OccurrenceMap => {
    const occurrenceMap: OccurrenceMap = Object
        .keys(pairOccurrenceMap)
        .reduce((polymerOccurrenceMap: OccurrenceMap, pair: string) => {
            let newOccurrenceMap = {...polymerOccurrenceMap};
            newOccurrenceMap = addToOccurrenceMap(pair.charAt(0), newOccurrenceMap, pairOccurrenceMap[pair]);
            newOccurrenceMap = addToOccurrenceMap(pair.charAt(1), newOccurrenceMap, pairOccurrenceMap[pair]);
            return newOccurrenceMap;
        }, {});

    occurrenceMap[template.charAt(0)]++;
    occurrenceMap[template.charAt(template.length - 1)]++;

    Object.keys(occurrenceMap).forEach(key => occurrenceMap[key] = Math.floor(occurrenceMap[key] / 2));
    return occurrenceMap;
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

    let pairOccurrenceMap = getPairOccurrenceMap(template);
    console.log(pairOccurrenceMap);

    for (let i = 0; i < 40; i++) {
        pairOccurrenceMap = updateOccurrenceMap(insertionRules, pairOccurrenceMap);
        console.log('Step', i + 1, pairOccurrenceMap);
    }

    const polymerOccurrenceMap = getPolymerOccurrenceMap(pairOccurrenceMap, template);

    const min = Object.values(polymerOccurrenceMap).reduce((a, b) => Math.min(a, b));
    const max = Object.values(polymerOccurrenceMap).reduce((a, b) => Math.max(a, b));

    return max - min;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

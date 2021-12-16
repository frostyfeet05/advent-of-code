const input = `SNVVKOBFKOPBFFFCPBSF

HH -> P
CH -> P
HK -> N
OS -> N
HV -> S
VC -> C
VO -> K
OC -> C
FB -> S
NP -> S
OK -> H
OO -> N
PP -> B
VK -> B
BV -> N
PN -> K
HC -> C
NS -> K
BO -> C
BN -> O
SP -> H
FK -> K
KF -> N
VP -> H
NO -> N
OH -> N
CC -> O
PK -> P
BF -> K
CP -> N
SH -> V
VS -> P
BH -> B
KS -> H
HB -> K
BK -> S
KV -> C
SF -> B
BB -> O
PC -> S
HN -> S
FP -> S
PH -> C
OB -> O
FH -> K
CS -> P
OF -> N
FF -> V
PV -> B
PF -> C
FC -> S
KC -> O
PS -> V
CO -> F
CK -> O
KH -> H
OP -> O
SK -> S
VB -> P
FN -> H
FS -> P
FV -> N
HP -> O
SB -> N
VN -> V
KK -> P
KO -> V
BC -> B
FO -> H
OV -> H
CF -> H
HF -> K
SS -> V
SC -> N
CB -> B
SV -> C
SN -> P
PB -> B
KP -> S
PO -> B
CN -> F
ON -> B
CV -> S
HO -> O
NF -> F
VH -> P
NN -> S
HS -> S
NV -> V
NH -> C
NB -> B
SO -> K
NC -> C
VF -> B
BS -> V
VV -> N
BP -> P
KN -> C
NK -> O
KB -> F`;
const sample = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

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

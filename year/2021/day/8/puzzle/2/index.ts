const input = ``;

const COMMON_SEGMENTS: CommonSegment[] = [
    {value: 0, common: [2, 3, 3, 6]},
    {value: 2, common: [1, 2, 2, 5]},
    {value: 3, common: [2, 3, 3, 5]},
    {value: 5, common: [1, 3, 2, 5]},
    {value: 6, common: [1, 3, 2, 6]},
    {value: 9, common: [2, 4, 3, 6]}
]

interface CommonSegment {
    value: number;
    common: number[];
}

const KNOWN_SEGMENTS: KnownSegment[] = [
    {value: 1, length: 2},
    {value: 4, length: 4},
    {value: 7, length: 3},
    {value: 8, length: 7}
];

interface KnownSegment {
    value: number;
    length: number;
}

interface CalculatedSegment {
    value: number;
    segment: string;
}

interface Line {
    inputs: string[];
    outputs: string[];
}

const Line = {
    parse(inputStr: string): Line {
        const [inputs, outputs] = inputStr.split(' | ')
            .map(x => x.split(' ')
                // .sort()
                .map(str => str.split('')
                    .sort()
                    .join('')
                )
            );
        return {inputs, outputs};
    }
};

const processInput = (input: string): Line[] => {
    return input.split('\n').map(Line.parse);
};

const calculateSegmentInCommonWithKnown = (segment: string, known: string[]): number[] => {
    return known.map(k => segment.split('').filter(s => k.includes(s)).length);
};

const calculateSegment = (segment: string, knownSegments: string[]): CalculatedSegment => {
    const knownSegment = KNOWN_SEGMENTS.find(s => s.length === segment.length);
    let value;
    if (knownSegment) {
        value = knownSegment.value;
    } else {
        const inCommon: number[] = calculateSegmentInCommonWithKnown(segment, knownSegments);
        const segmentMatch = COMMON_SEGMENTS.find(s => s.common.every((s, i) => inCommon[i] === s));
        if (segmentMatch) {
            value = segmentMatch.value;
        } else {
            throw new Error('Could not match with a segment');
        }
    }
    return {value, segment};
}

const calculateSignal = (line: Line): number => {
    const knownSegments: string[] = KNOWN_SEGMENTS.map(s => {
        const match = line.inputs.find(l => l.length === s.length);
        if (!match) {
            throw new Error('Could not find known segments');
        }
        return match;
    });
    const segments = line.inputs.map(segment => calculateSegment(segment, knownSegments));

    const signal: number[] = line.outputs.map(o => {
        const match = segments.find(s => s.segment === o);
        if (!match) {
            throw new Error('Could not match output with segment');
        }
        return match.value;
    });
    const result = signal.join('');
    console.log(...line.outputs, result);
    return parseInt(result);
};

const solve = (input: string): number => {
    const lines = processInput(input);
    return lines.map(calculateSignal).reduce((a, b) => a + b);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

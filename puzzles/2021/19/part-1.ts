import {Overlap, sample, Scanner} from './shared';

const solve = (input: string): number => {
    const scanners = Scanner.parse(input);

    let overlap = Overlap.init();
    overlap = Overlap.addScanner(scanners[0], overlap);

    console.log(JSON.stringify(overlap.beacons, null, 2));

    return 0;
}

const result = solve(sample);
console.log(`Result is ${result}`);

export {};

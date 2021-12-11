const input = ``;

interface Octopus {
    x: number;
    y: number;
    energy: number;
    flashing: boolean;
}

const Octopus = {
    parse(x: number, y:number, energy: string): Octopus {
        return {x, y, energy: parseInt(energy), flashing: false};
    },
    step(octopus: Octopus): void {
        octopus.energy++;
        octopus.flashing = octopus.energy > 9;
    },
    isFlashing(octopus: Octopus): boolean {
        return octopus.flashing;
    },
    reset(octopus: Octopus): void {
        if (octopus.flashing) {
            octopus.energy = 0;
            octopus.flashing = false;
        }
    }
}

const processInput = (input: string): Octopus[] => {
    return input.split('\n')
        .flatMap((i, y) => i.split('')
            .map((energy, x) => Octopus.parse(x, y, energy)));
};

const findNonFlashingNeighbors = (octopus: Octopus, octopi: Octopus[]): Octopus[] => {
    const aux = [-1, 0, 1];
    return aux.flatMap(y => {
        return aux.flatMap(x => {
            return octopi.filter(o => o.x === (octopus.x + x) && o.y === (octopus.y + y));
        });
    }).filter(o => !(o.x === octopus.x && o.y === octopus.y));
};

const step = (octopus: Octopus, octopi: Octopus[]): void => {
    if (octopus.flashing) return;

    Octopus.step(octopus);
    if (octopus.flashing) {
        findNonFlashingNeighbors(octopus, octopi).forEach(o => step(o, octopi));
    }
}

const countFlashing = (octopi: Octopus[]): number => {
    return octopi.map(Octopus.isFlashing)
        .map(Number)
        .reduce((a, b) => a + b);
}

const solve = (input: string): number => {
    const octopi = processInput(input);
    let totalCount = 0;

    for (let i = 0; i < 100; i++) {
        octopi.forEach(o => step(o, octopi));
        totalCount += countFlashing(octopi);
        octopi.forEach(Octopus.reset);
    }

    return totalCount;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

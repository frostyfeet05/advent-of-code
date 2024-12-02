export const input = ``;

const signalCycles = [20, 60, 100, 140, 180, 220];

type Cycle = {
    cycle: number;
    signals: number[];
}

type DrawCycle = {
    cycle: number;
    pixels: string[];
    position: number;
}

export const CPU = {
    parse: (input: string): string[] => {
        return input.split('\n');
    },
    findSignalStrength: (instructions: string[]): number => {
        let cycleInfo: Cycle = {cycle: 1, signals: []};
        let register = 1;

        instructions.forEach(instruction => {
            if (instruction.startsWith('noop')) {
                cycleInfo = doCycle(cycleInfo, register);
            } else if (instruction.startsWith('addx')) {
                cycleInfo = doCycle(cycleInfo, register);
                const x = parseInt(instruction.split(' ')[1]);
                register = register + x;
                cycleInfo = doCycle(cycleInfo, register);
            }
        });

        return cycleInfo.signals.reduce((a, b) => a + b);
    },
    draw: (instructions: string[]): void => {
        let cycle: DrawCycle = {cycle: 1, position: 0, pixels: []};
        let register = 1;

        instructions.forEach((instruction) => {
            if (instruction.startsWith('noop')) {
                cycle = drawCycle(cycle, register);
            } else if (instruction.startsWith('addx')) {
                cycle = drawCycle(cycle, register);
                cycle = drawCycle(cycle, register);
                const x = parseInt(instruction.split(' ')[1]);
                register = register + x;
            }
        });

        cycle.pixels
            .reduce((groups: string[][], row, index) => {
                const group = Math.floor(index / 40);
                groups[group] = [...(groups[group] || []), row];
                return groups;
            }, [])
            .forEach(group => {
                console.log(group.join(''));
            });
    }
};

const doCycle = (info: Cycle, register: number): Cycle => {
    const newInfo = {
        cycle: info.cycle + 1,
        signals: [...info.signals],
    };
    if (signalCycles.includes(newInfo.cycle)) {
        newInfo.signals.push(register * newInfo.cycle);
    }

    return newInfo;
};

const drawCycle = (cycle: DrawCycle, register: number): DrawCycle => {
    const correctedPosition = cycle.position % 40;
    const isLit = (register - 1) <= correctedPosition && correctedPosition <= (register + 1);
    const pixels = [
        ...cycle.pixels,
        isLit ? '#' : '.'
    ];
    return {
        cycle: cycle.cycle + 1,
        position: cycle.position + 1,
        pixels
    };
};

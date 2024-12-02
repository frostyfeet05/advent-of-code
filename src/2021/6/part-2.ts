const input = ``;

const processInput = (input: string): number[] => {
    const fish = new Array(9).fill(0);
    input.split(',').map(Number).forEach(x => fish[x]++);
    return fish;
};

const ageUp = (fish: number[]) => {
    let newFish = [...fish];
    let today = newFish.shift()!;
    newFish.push(today);
    newFish[6] += today;
    return newFish;
};

const solve = (input: string): number => {
    let fish = processInput(input);

    for (let day = 0; day < 256; day++) {
        fish = ageUp(fish);
    }

    return fish.reduce((a, b) => a + b);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

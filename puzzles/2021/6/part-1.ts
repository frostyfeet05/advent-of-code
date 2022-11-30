const input = ``;

const processInput = (input: string): number[] => {
    return input.split(',').map(Number);
};

const ageUp = (fish: number[]) => {
    let newFish = fish.map(f => f - 1);
    newFish.filter(age => age === -1).forEach(_ => newFish.push(8));
    newFish = newFish.map(age => {
        if (age === -1) {
            return 6;
        }
        return age;
    });
    return newFish;
}

const solve = (input: string): number => {
    let fish = processInput(input);

    for (let day = 0; day < 80; day++) {
        fish = ageUp(fish);
    }

    return fish.length;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

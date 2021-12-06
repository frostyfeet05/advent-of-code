const input = '';

const processInput = (input) => {
    return input.split(',');
}

const doCycle = (fishes, day) => {
    let newFishes = fishes.map(fish => fish - 1);
    newFishes.forEach(fish => {
        if (fish === -1) {
            newFishes.push(8);
        }
    })
    newFishes = newFishes.map(fish => {
        if (fish === -1) {
            return 6;
        }
        return fish;
    })
    return newFishes;
}

const doPuzzle = (input) => {
    let fishes = processInput(input);

    for (let day = 0; day < 80; day++) {
        fishes = doCycle(fishes, day);
    }

    return fishes.length;
}

const result = doPuzzle(input);
console.log(`Result is ${result}`);

const input = '';

const processInput = (input) => {
    const fishes = new Array(9).fill(0);
    input.split(',').forEach(i => fishes[i]++);
    return fishes;
}

const doCycle = (fishes) => {
    let newFishes = [...fishes];
    let today = newFishes.shift();
    newFishes.push(today);
    newFishes[6] += today;
    return newFishes;
}

const doPuzzle = (input) => {
    let fishes = processInput(input);

    for (let day = 0; day < 256; day++) {
        fishes = doCycle(fishes);
    }

    return fishes.reduce((p, c) => p + c);
}

const result = doPuzzle(input);
console.log(`Result is ${result}`);

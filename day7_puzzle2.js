const input = '';

const processInput = (input) => {
    return input.split(',');
}

const calculateFuel = (positions, to) => {
    return positions.map(pos => {
        const moves = Math.abs(pos - to);
        return Math.ceil(moves * (moves + 1) / 2);
    }).reduce((a, b) => a+b);
}

const doPuzzle = (input) => {
    let positions = processInput(input);

    const max = getMax(positions);
    const fuels = Array.from({length: max + 1}, (x, i) => i).map(f => calculateFuel(positions, f));
    return getMin(fuels);
}

const getMin = (list) => {
    return list.reduce((a, b) => Math.min(a, b));
}

const getMax = (list) => {
    return list.reduce((a, b) => Math.max(a, b));
}

const result = doPuzzle(input);
console.log(`Result is ${result}`);

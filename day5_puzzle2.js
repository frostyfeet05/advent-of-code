const input = '';

const processInput = (input) => {
    return input.split('\n').map(line => {
        const [[x1, y1], [x2, y2]] = line.split(' -> ').map(x => x.split(','));
        return {x1, y1, x2, y2};
    });
}

const interpolate = (line) => {
    let points = [];
    if (line.x1 === line.x2) {
        points = interpolateArray(line.y1, line.y2).map(y => `${line.x1},${y}`);
    } else if (line.y1 === line.y2) {
        points = interpolateArray(line.x1, line.x2).map(x => `${x},${line.y1}`);
    } else {
        const x = interpolateArray(line.x1, line.x2);
        const y = interpolateArray(line.y1, line.y2);
        points = x.map((v, i) => `${v},${y[i]}`);
    }
    return points;
}

const interpolateArray = (from, to) => {
    const length = Math.abs(to - from) + 1;
    const startAt = Math.min(from, to);
    let range = Array.from({length}, (x, i) => startAt + i);
    if (parseInt(to) < parseInt(from)) {
        range = range.reverse();
    }
    return range;
}

const doPuzzle = (input) => {
    const lines = processInput(input);

    const points = lines.map(line => interpolate(line)).flat();

    const result = Object.values(points.reduce((prev, cur) => (prev[cur] = prev[cur] + 1 || 1, prev), []))
        .filter(p => p > 1);

    return result.length;
}

const result = doPuzzle(input);
console.log(`Result is ${result}`);

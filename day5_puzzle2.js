const input = '';

processInput = (input) => {
    return input.split('\n').map(line => {
        const [[x1, y1], [x2, y2]] = line.split(' -> ').map(x => x.split(','));
        return {x1, y1, x2, y2};
    });
}

interpolate = (line) => {
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

interpolateArray = (from, to) => {
    const length = Math.abs(to - from) + 1;
    const startAt = Math.min(from, to);
    let range = Array.from({length}, (x, i) => startAt + i);
    if (to < from) {
        range = range.reverse();
    }
    return range;
}

doPuzzle = (input) => {
    const lines = processInput(input);
    const result = [];

    lines.forEach(line => result.push(...interpolate(line)));

    return Object.values(result.reduce((prev, cur) => (prev[cur] = prev[cur] + 1 || 1, prev), []))
        .filter(p => p > 1)
        .length;
}

const result = doPuzzle(input);
console.log(`Result is ${result}`);

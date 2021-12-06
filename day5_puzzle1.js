const input = '';

processInput = (input) => {
    return input.split('\n').map(line => {
        const [p1, p2] = line.split(' -> ').map(x => x.split(','));
        return {x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1]};
    });
}

interpolate = (line) => {
    let points = [];
    if (line.x1 === line.x2) {
        points = interpolateArray(line.y1, line.y2).map(y => `${line.x1},${y}`);
    } else if (line.y1 === line.y2) {
        points = interpolateArray(line.x1, line.x2).map(x => `${x},${line.y1}`);
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

    // horizontals
    lines.filter(line => line.x1 === line.x2).forEach(line => result.push(...interpolate(line)));
    // verticals
    lines.filter(line => line.y1 === line.y2).forEach(line => result.push(...interpolate(line)));

    return Object.values(result.reduce((prev, cur) => (prev[cur] = prev[cur] + 1 || 1, prev), []))
        .filter(p => p > 1)
        .length;
}

const result = doPuzzle(input);
console.log(`Result is ${result}`);

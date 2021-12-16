const input = ``;

type Edge = { [node: string]: number };

interface Graph {
    edges: { [node: string]: Edge };
    distances: {[node: string]: number};
    parents: {[node: string]: string};
    end: string;
}

const Graph = {
    parse(input: string): Graph {
        const edges: { [node: string]: Edge } = {};
        const map: number[][] = input.split('\n').map(y => y.split('').map(Number));
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                const key = getKey(x, y);
                edges[key] = (edges[key] || {});

                if (y > 0) {
                    edges[key][getKey(x, y - 1)] = map[y - 1][x];
                }
                if (y < map.length - 1) {
                    edges[key][getKey(x, y + 1)] = map[y + 1][x];
                }
                if (x > 0) {
                    edges[key][getKey(x - 1, y)] = map[y][x - 1];
                }
                if (x < map[y].length - 1) {
                    edges[key][getKey(x + 1, y)] = map[y][x + 1];
                }
            }
        }

        const distances: {[node: string]: number} = {};
        const parents: {[node: string]: string} = {};

        Object.keys(edges).forEach(node => {
            distances[node] = Infinity;
            parents[node] = '';
        });
        distances['0,0'] = 0;

        const end = `${map[0].length - 1},${map.length - 1}`;

        return {edges, distances, parents, end};
    }
};

const getKey = (x: number, y: number): string => {
    return `${x},${y}`;
};

const processInput = (input: string): Graph => {
    return Graph.parse(input);
};

const findShortestDistance = (distances: {[node: string]: number}, visited: string[]): string => {
    let shortest = Infinity;
    let shortestNode = '';

    for (let node in distances) {
        let distance = distances[node];
        if (distance < shortest && !visited.includes(node)) {
            shortestNode = node;
            shortest = distance;
        }
    }

    return shortestNode;
}

const solve = (input: string): number => {
    const {distances, edges, parents, end} = processInput(input);
    const visited: string[] = [];

    let current = findShortestDistance(distances, visited);
    while(current !== '') {
        let distance = distances[current];
        let adjacents = edges[current];

        for (let adjacent in adjacents) {
            let newDistance = distance + adjacents[adjacent];
            if (distances[adjacent] > newDistance) {
                distances[adjacent] = newDistance;
                parents[adjacent] = current;
            }
        }
        visited.push(current);
        current = findShortestDistance(distances, visited);
    }

    return distances[end];
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

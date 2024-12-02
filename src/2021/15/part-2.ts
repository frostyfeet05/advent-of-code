const PriorityQueue = require('priorityqueuejs');

const input = ``;

const ZOOM_FACTOR = 5;

type Node = { cost: number, name: string; };
type Edge = { [node: string]: number };

interface Graph {
    edges: { [node: string]: Edge };
    end: string;
}

const createMap = (input: string): number[][] => {
    const originalMap: number[][] = input.split('\n').map(y => y.split('').map(Number));
    const originalWidth = originalMap[0].length;
    const originalHeight = originalMap.length;
    const map: number[][] = Array.from({length: originalHeight * ZOOM_FACTOR}, () => Array.from({length: originalWidth * ZOOM_FACTOR}, () => 0));

    for (let dy = 0; dy < ZOOM_FACTOR; dy++) {
        for (let dx = 0; dx < ZOOM_FACTOR; dx++) {
            for (let my = 0; my < originalMap.length; my++) {
                for (let mx = 0; mx < originalMap[my].length; mx++) {
                    const x = mx + (dx * originalWidth);
                    const y = my + (dy * originalHeight);
                    const riskIncrease = dx + dy;
                    const newRisk = originalMap[my][mx] + riskIncrease;
                    map[y][x] = newRisk % 9 === 0 ? 9 : newRisk % 9;
                }
            }
        }
    }

    return map;
};

const Graph = {
    parse(input: string): Graph {
        const edges: { [node: string]: Edge } = {};
        const map: number[][] = createMap(input);
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

        const end = `${map[0].length - 1},${map.length - 1}`;
        return {edges, end};
    }
};

const getKey = (x: number, y: number): string => {
    return `${x},${y}`;
};

const processInput = (input: string): Graph => {
    return Graph.parse(input);
};

const solve = (input: string): number => {
    const {edges, end} = processInput(input);

    const costs: { [key: string]: number } = {'0,0': 0};
    const visited: { [key: string]: boolean } = {};
    const queue = new PriorityQueue((a: Node, b: Node) => b.cost - a.cost);
    const path: { [key: string]: string } = {};
    queue.enq({name: '0,0', cost: 0} as Node);

    while (!queue.isEmpty()) {
        const current: string = queue.deq().name;

        if (!visited[current]) {

            Object.keys(edges[current]).forEach(next => {
                let newCost = costs[current] + edges[current][next];
                if (!costs[next] || costs[next] > newCost) {
                    queue.enq({cost: newCost, name: next} as Node);
                    costs[next] = newCost;
                    path[next] = current;
                }
            });

            visited[current] = true;
        }
    }

    let pos = end;
    let totalRisk = 0;

    while (pos !== '0,0') {
        totalRisk += costs[pos];
        pos = path[pos];
    }

    return costs[end];
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

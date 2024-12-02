export const input = ``;

type Point = {
  x: number;
  y: number;
};
type Grid = string[][];

const PIPE_CONNECTIONS: { [key: string]: Point[] } = {
  '|': [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ],
  '-': [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
  ],
  L: [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
  ],
  J: [
    { x: 0, y: -1 },
    { x: -1, y: 0 },
  ],
  '7': [
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ],
  F: [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
  ],
};

export const Puzzle = {
  parse: (input: string): Point[] => {
    const grid = input.split('\n').map((line) => line.split(''));

    const y = grid.findIndex((line) => line.indexOf('S') >= 0);
    const x = grid[y].indexOf('S');
    const start = { x, y };
    const startConnections: Point[] = [];

    [
      { x: -1, y: 0 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ].forEach((adj) => {
      const current = { x: start.x + adj.x, y: start.y + adj.y };
      const [connA, connB] = getConnections(grid, current);

      const isConnectedToStart = (connA && isSameLocation(start, connA)) || (connB && isSameLocation(start, connB));

      if (isConnectedToStart) {
        startConnections.push(current);
      }
    });

    const loop = [start];
    let [loc] = startConnections;
    let previous = start;
    let next;

    while (grid[loc.y][loc.x] !== 'S') {
      next = getNext(grid, loc, previous);
      previous = loc;
      loc = next;
      loop.push(start);
    }

    return loop;
  },
};

const getConnections = (grid: Grid, { x, y }: Point): Point[] => {
  const value = grid[y][x];
  const connections = PIPE_CONNECTIONS[value];
  if (!connections) {
    return [];
  }
  return connections.map((delta) => ({ x: x + delta.x, y: y + delta.y }));
};

const isSameLocation = (first: Point, second: Point): boolean => first.x === second.x && first.y === second.y;

const getNext = (grid: Grid, current: Point, previous: Point): Point => {
  return getConnections(grid, current).find((conn) => !isSameLocation(conn, previous)) as Point;
};

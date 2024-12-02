import { Puzzle, input } from './shared';
import { Vector2 } from '../../util/vector';
import { manhattanDistance, Matrix } from '../../util/matrix';
import { sum } from '../../util/array';

const solve = (input: string): number => {
  let matrix = Puzzle.parse(input);

  const DISTANCE_MODIFIER = 1_000_000;
  // calculate rowIndices with 'gaps'
  const rows = matrix.reduce((indices: number[], row: string[], index: number): number[] => {
    const lastIndex = indices.length === 0 ? -1 : indices[indices.length - 1];
    if (row.every((x) => x === '.')) {
      return [...indices, lastIndex + DISTANCE_MODIFIER];
    }
    return [...indices, lastIndex + 1];
  }, []);

  // calculate columnIndices with 'gaps'
  const cols = Matrix.transpose(matrix).reduce((indices: number[], col: string[], index: number): number[] => {
    const lastIndex = indices.length === 0 ? -1 : indices[indices.length - 1];
    if (col.every((x) => x === '.')) {
      return [...indices, lastIndex + DISTANCE_MODIFIER];
    }
    return [...indices, lastIndex + 1];
  }, []);

  // find galaxies
  const galaxies = matrix.reduce((galaxies, row, y): Vector2[] => {
    const rowGalaxies = row.reduce((rowGalaxies, element, x): Vector2[] => {
      if (element === '#') {
        return [...rowGalaxies, [cols[x], rows[y]]];
      }
      return rowGalaxies;
    }, [] as Vector2[]);

    return [...galaxies, ...rowGalaxies];
  }, [] as Vector2[]);

  // create pairs
  const pairs = [];
  for (let x = 0; x < galaxies.length - 1; x++) {
    for (let y = x + 1; y < galaxies.length; y++) {
      pairs.push([galaxies[x], galaxies[y]]);
    }
  }

  const distances = pairs.map((pair) => manhattanDistance(pair[0], pair[1]));
  return sum(distances);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};

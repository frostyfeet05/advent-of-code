import { Puzzle } from './shared';
import { type Vector2 } from '@util/vector.ts';
import { manhattanDistance, Matrix } from '@util/matrix.ts';
import { sum } from '@util/array.ts';

export const solve = (input: string): number => {
  let matrix = Puzzle.parse(input);

  // find empty rows and duplicate
  matrix = matrix.reduce((a: Matrix<string>, b: string[]) => {
    if (b.every((x) => x === '.')) {
      return [...a, b, b];
    } else {
      return [...a, b];
    }
  }, [] as Matrix<string>);

  // find empty columns and duplicate
  matrix = Matrix.transpose(matrix).reduce((a: Matrix<string>, b: string[]) => {
    if (b.every((x) => x === '.')) {
      return [...a, b, b];
    } else {
      return [...a, b];
    }
  }, [] as Matrix<string>);
  matrix = Matrix.transpose(matrix);

  // find galaxies
  const galaxies = matrix.reduce((galaxies, row, y): Vector2[] => {
    const rowGalaxies = row.reduce((rowGalaxies, element, x): Vector2[] => {
      if (element === '#') {
        return [...rowGalaxies, [x, y]];
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

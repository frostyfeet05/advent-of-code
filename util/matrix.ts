import { Vector2 } from '@util/vector';

export type Matrix<T> = T[][];

export const Matrix = {
  fromString: <T>(input: string): Matrix<T> =>
    input.split('\n').map((row) => row.split('').map((element) => element as T)),

  transpose: <T>(matrix: Matrix<T>): Matrix<T> => matrix[0].map((col, i) => matrix.map((row) => row[i])),
};

export const manhattanDistance = (first: Vector2, second: Vector2): number => {
  return Math.abs(first[0] - second[0]) + Math.abs(first[1] - second[1]);
};

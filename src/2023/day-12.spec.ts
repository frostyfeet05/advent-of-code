import { describe, expect, it } from 'bun:test';
import { solve as solve1 } from './11/part-1.ts';
import { solve as solve2 } from './11/part-2.ts';

const sample = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

describe('Year 2023 day 11', () => {
  it('part 1 should give the correct sample answer', () => {
    expect(solve1(sample)).toBe(374);
  });
  it('part 2 should give the correct sample answer', () => {
    expect(solve2(sample)).toBe(82000210);
  });
});

import { describe, expect, it } from 'bun:test';
import { solve as solve1 } from './3/part-1.ts';
import { solve as solve2 } from './3/part-2.ts';

const sample = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

describe('Year 2023 day 3', () => {
  it('part 1 should give the correct sample answer', () => {
    expect(solve1(sample)).toBe(4361);
  });
  it('part 2 should give the correct sample answer', () => {
    expect(solve2(sample)).toBe(467835);
  });
});

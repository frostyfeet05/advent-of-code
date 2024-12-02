import { describe, expect, it } from 'bun:test';
import { solve as solve1 } from './10/part-1.ts';

const sample1 = `.....
.S-7.
.|.|.
.L-J.
.....`;

const sample2 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

describe('Year 2023 day 10', () => {
  it('part 1 should give the correct sample1 answer', () => {
    expect(solve1(sample1)).toBe(4);
  });
  it('part 1 should give the correct sample2 answer', () => {
    expect(solve1(sample2)).toBe(8);
  });
});

import { describe, expect, it } from 'bun:test';
import { solve as solve1 } from './1/part-1.ts';
import { solve as solve2 } from './1/part-2.ts';

const sample = `3   4
4   3
2   5
1   3
3   9
3   3`;

describe('Year 2024 day 1', () => {
  it('part 1 should give the correct sample answer', () => {
    expect(solve1(sample)).toBe(11);
  });
  it('part 2 should give the correct sample answer', () => {
    expect(solve2(sample)).toBe(31);
  });
});

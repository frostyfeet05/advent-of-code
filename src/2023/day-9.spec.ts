import { describe, expect, it } from 'bun:test';
import { solve as solve1 } from './9/part-1.ts';
import { solve as solve2 } from './9/part-2.ts';

const sample = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

describe('Year 2023 day 9', () => {
  it('part 1 should give the correct sample answer', () => {
    expect(solve1(sample)).toBe(114);
  });
  it('part 2 should give the correct sample answer', () => {
    expect(solve2(sample)).toBe(2);
  });
});

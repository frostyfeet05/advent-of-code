import { describe, expect, it } from 'bun:test';
import { solve as solve1 } from './2/part-1.ts';
import { solve as solve2 } from './2/part-2.ts';

const sample = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

describe('Year 2024 day 2', () => {
  it('part 1 should give the correct sample answer', () => {
    expect(solve1(sample)).toBe(2);
  });
  it('part 2 should give the correct sample answer', () => {
    expect(solve2(sample)).toBe(4);
  });
});

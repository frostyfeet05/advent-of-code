import { describe, expect, it } from 'bun:test';
import { solve as solve1 } from './2/part-1.ts';
import { solve as solve2 } from './2/part-2.ts';

const sample = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

describe('Year 2023 day 2', () => {
  it('part 1 should give the correct sample answer', () => {
    expect(solve1(sample)).toBe(8);
  });
  it('part 2 should give the correct sample answer', () => {
    expect(solve2(sample)).toBe(2286);
  });
});

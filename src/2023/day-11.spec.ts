import { describe, expect, it } from 'bun:test';
import { solve as solve1 } from './12/part-1.ts';

const sample = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

describe('Year 2023 day 12', () => {
  it('part 1 should give the correct sample answer', () => {
    expect(solve1(sample)).toBe(21);
  });
});

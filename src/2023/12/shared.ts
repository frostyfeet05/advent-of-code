type Spring = {
  springs: string;
  groups: number[];
};

export const Spring = {
  isValid: (spring: Spring): boolean => {
    const { springs, groups } = spring;
    const springGroups = springs.split('.').filter((x) => x);

    if (springGroups.length !== groups.length) {
      return false;
    }

    return groups.every((x, i) => springGroups[i].length === x);
  },
  getDamagedIndices: (spring: Spring): { [key: number]: string[] } => {
    return spring.springs.split('').reduce((a: { [key: number]: string[] }, b: string, index) => {
      return b === '?' ? { ...a, [index]: ['.', '#'] } : a;
    }, []);
  },
  generatePossibleSprings: (spring: Spring): Spring[] => {
    const damaged = Spring.getDamagedIndices(spring);
    const iterations = getIterationIndices(Object.keys(damaged).length);

    return iterations
      .map((iter) => {
        const newSpring = spring.springs.split('');

        Object.keys(damaged).forEach((value: string, index) => {
          const damagedIndex = parseInt(value);
          const bin = iter.split('').map(Number)[index];
          newSpring[damagedIndex] = damaged[damagedIndex][bin];
        });

        return { springs: newSpring.join(''), groups: spring.groups };
      })
      .filter(Spring.isValid);
  },
};

export const Puzzle = {
  parse: (input: string): Spring[] =>
    input.split('\n').map((row) => {
      const [springs, groupStr] = row.split(' ');
      const groups = groupStr.split(',').map(Number);
      return { springs, groups };
    }),
};

const getIterationIndices = (amount: number): string[] => {
  const limit = Math.pow(2, amount);
  console.log(`2^${amount} = ${limit}`);
  return [...Array(limit).keys()].map((x) => (x >>> 0).toString(2).padStart(amount, '0'));
};

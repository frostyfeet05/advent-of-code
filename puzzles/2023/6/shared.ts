export const input = ``;

type Race = {
  time: number;
  distance: number;
};

export const Puzzle = {
  parse: (input: string): Race[] => {
    const [times, distances] = input
      .split('\n')
      .map((line) => line.split(': ')[1].trim())
      .map((line) =>
        line
          .split(' ')
          .filter((x) => x)
          .map(Number),
      );
    return times.map((time, index) => ({
      time,
      distance: distances[index],
    }));
  },
  parseSingleRace: (input: string): Race => {
    const [time, distance] = input
      .split('\n')
      .map((line) => line.split(':')[1].replaceAll(' ', ''))
      .map(Number);
    return { time, distance };
  },
  calculateDistance: (hold: number, limit: number): number => (limit - hold) * hold,
};

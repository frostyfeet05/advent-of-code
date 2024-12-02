export const sum = (array: number[]): number => array.reduce((a, b) => a + b);
export const multiply = (array: number[]): number => array.reduce((a, b) => a * b);
export const lowest = (array: number[]): number => array.sort()[0];
export const highest = (array: number[]): number => array.sort().reverse()[0];

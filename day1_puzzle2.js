const input = [];

doPuzzle = (arr) => {
    return arr
    .map((value, index, array) => value + array[index + 1] + array[index + 2])
    .filter((value, index, array) => value > array[index - 1]).length;
}

const result = doPuzzle(input);
console.log(`${result} sums are larger than the previous`);
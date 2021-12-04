const input = [];

doPuzzle = (arr) => {
    return arr.filter((value, index, array) => value > array[index - 1]).length;
}

const result = doPuzzle(input);
console.log(`${result} measurements are larger than the previous`);
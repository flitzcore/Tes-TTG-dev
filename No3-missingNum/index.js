function findMissingNumbers(arr) {

    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const numSet = new Set(arr);
    const missingNumbers = [];

    for (let i = min; i <= max; i++) {
        if (!numSet.has(i)) {
            missingNumbers.push(i);
        }
    }

    return missingNumbers;
}
console.log(findMissingNumbers([3, 0, 2, 4]));
console.log(findMissingNumbers([3106, 3102, 3104, 3105, 3107]));
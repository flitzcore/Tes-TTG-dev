/*
Explanation:

The findMinMax function is used to find the minimum and maximum values in the input array. It's better than Math.min and Math.max because it only iterates through the array once. With the for loop after it, it will only use O(3n) time complexity.


*/
function findMinMax(arr) {
    let min = arr[0];
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }

    return { min, max };
}

function findMissingNumbers(arr) {
    const { min, max } = findMinMax(arr);
    const numSet = new Set(arr);
    const missingNumbers = [];

    for (let i = min; i <= max; i++) {
        if (!numSet.has(i)) {
            missingNumbers.push(i);
        }
    }

    return missingNumbers;
}

console.log(findMissingNumbers([3, 0, 2, 4])); // Output: [1]
console.log(findMissingNumbers([3106, 3102, 3104, 3105, 3107])); // Output: [3103]

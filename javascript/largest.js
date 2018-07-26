// Return an array containing the largest number of each array in a series.
function largestOfFour(arr) {
    let largest = arr.map(x => Math.max(...x));
    return largest;
}

// Return [ 5, 27, 39, 1001 ]
console.log(largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]));

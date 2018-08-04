/*
Return the sum of all numbers that fall within the range specified by two numbers in an array (inclusive), regardless of the order they are in.
*/

function sumAll(arr) {
    let sum = 0;
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    for (let x=min; x <= max; x++) {
        sum += x;
    }
    return sum;
}

console.log(sumAll([1, 4]));

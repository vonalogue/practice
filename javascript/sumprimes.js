// Return the sum of all prime numbers less than or equal to num.

function sumPrimes(num) {
    let sum = 0;
    findPrimes:
    for (let x=2; x <= num; x++) {
        for (let y=2; y < x; y++) {
            if (x % y === 0) {
                continue findPrimes;
            }
        }
        sum += x;
    }
    return sum;
}

console.log(sumPrimes(10));     // return 17
console.log(sumPrimes(977));    // return 73156

// Return the sum of all odd fibonacci numbers less than or equal to num.

function sumFibs(num) {
    let nums = [];
    let odds = [];
    let fib = 0;
    let it = 0;

    while (true) {
        if (it < 2) {
            fib = it;
        } else {
            fib = nums[it-2] + nums[it-1];
        }
        if (fib <= num) {
            nums.push(fib);
            it++;
        } else {
            break;
        }
        if (fib % 2 != 0) {
            odds.push(fib);
        }
    }
    return odds.reduce((s, n) => s + n);
}

console.log(sumFibs(10));   // return 10 (1+1+3+5)
console.log(sumFibs(4));    // return 5 (1+1+3)
console.log(sumFibs(1000)); // return 1785

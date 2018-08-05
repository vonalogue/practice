/*
Return the least common multiple (LCM) of all numbers that fall within the inclusive range specified by
two integers provided in arr.
*/

function smallestCommon(arr) {
    arr.sort((k, j) => k-j);
    let min = arr[0];
    let max = arr[1];
    let factors = [];
    let LCM = 0;

    for (let num = min; num <= max; num++) {
        let factor = 0;
        if (!LCM) {
            LCM = num;
        } else {
            if (LCM % num == 0)
                { continue; }
            if (num != LCM+1) {
                for (let f=2; f < num; f++) {
                    if (num % f == 0 && LCM*f % num == 0) {
                        factor = f;
                        break;
                    }
                }
            }
            LCM *= factor != 0 ? factor : num;
        }
        factors.push(num);
    }
    return LCM;
}

console.log(smallestCommon([1, 3]));   // return 6
console.log(smallestCommon([5, 1]));   // return 60
console.log(smallestCommon([12,14]));  // return 1092
console.log(smallestCommon([5,9]));    // return 2520
console.log(smallestCommon([1,10]));   // return 2520

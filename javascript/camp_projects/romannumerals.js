// Convert a number into a Roman numeral.

function convertToRoman(num) {
    const dec = [1000, 100, 10, 1];
    const numerals = { 1: ['I', 'V', 'X'],
                        10: ['X', 'L', 'C'],
                        100: ['C', 'D', 'M'],
                        1000: ['M'] };

    var roundDown = (x) => Math.floor(x);
    var romNum = '';
    var chars = '';
    var factor = 0;

    for (let d of dec) {
        if (num >= d) {
            factor = roundDown(num / d);
            if (factor < 4) {
                chars = Array(factor + 1).join(numerals[d][0]);
            }
            else if (factor === 4) {
                chars = numerals[d][0].concat(numerals[d][1]);
            }
            else if (factor >= 5 && factor < 9) {
                chars = numerals[d][1].concat(Array(factor - 4).join(numerals[d][0]));
            }
            else if (factor === 9) {
                chars = numerals[d][0].concat(numerals[d][2]);
            }
            num = num % d;
            romNum += chars;
        }
        if (!num) { break; }
    }
    return romNum;
}

console.log(convertToRoman(39));

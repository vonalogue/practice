/*
Determine whether all alphanumerics in a string form a palindrome in their original order after removing
all special characters (including underscores).
*/

function palindrome(str) {
    let chars = str.toLowerCase().match(/[^_\W]/g);
    let left = 0;
    let right = chars.length - 1;

    while (right >= 0) {
        if (chars[left] !== chars[right] ) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

console.log(palindrome("1 9$91"));              // return true for '1991'
console.log(palindrome("0_0 (: /-\ :) 0-0"));   // return true for '0000'

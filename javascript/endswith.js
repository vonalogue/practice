// Return true if a string (str) ends with another (target).
function confirmEnding(str, target) {
    if (str.slice(-target.length) === target) {
        return true;
    }
    return false;
}

console.log(confirmEnding("d", "d"));                       // true
console.log(confirmEnding("god damn it!", "damn it!"));     // true
console.log(confirmEnding("damn", "damn, dude!"));          // false
console.log(confirmEnding("damn", ""));                     // false

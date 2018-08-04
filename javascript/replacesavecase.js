// Replace a word in a string while preserving case.

function myReplace(str, before, after) {
    if (before[0].match(/[A-Z]/)) {
        after = after[0].toUpperCase() + after.slice(1);
    } else if (before[0].match(/[a-z]/)) {
        after = after[0].toLowerCase() + after.slice(1);
    }
    return str.replace(before, after);
}

console.log(myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped"));
console.log(myReplace("He is Sleeping on the couch", "Sleeping", "sitting"));   // return 'He is Sitting on the couch'

// Return the letter that's missing in an alphabetical sequence (see examples at bottom).

function findMissingLetter(str) {
    let prev = 0;
    let current = 0;

    for (let c=0; c < str.length; c++) {
        current = str.charCodeAt(c);
        prev = c > 0 ? str.charCodeAt(c-1) : current;
        if (current !== prev && current-prev !== 1) {
            return String.fromCharCode(current-1);
        }
    }
    return undefined;
}

console.log(findMissingLetter("abce"));                         // return 'd'
console.log(findMissingLetter("stvwx"));                        // return 'u'
console.log(findMissingLetter("abcdefghijklmnopqrstuvwxyz"));   // return undefined.

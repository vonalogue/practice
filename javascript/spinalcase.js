// Take a string and return it in hyphenated, lower-case form.

function spinalCase(str) {
    let words = str.split(/[\W^_]+|[A-Z]/).map(w => w.toLowerCase());
    return words.join('-');
}

console.log(spinalCase('This Is Spinal Tap'));          // return 'this-is-spinal-tap'
console.log(spinalCase('The_Andy_Griffith_Show'));
console.log(spinalCase('AllThe-small Things'));
console.log(spinalCase('thisIsSpinalTap'));

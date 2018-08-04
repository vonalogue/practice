/*
Translate to Pig Latin, using the following rules:
    -if str starts with a vowel, append 'way' to the end
    -if str starts with 1+ consonants, move those to the end and append 'ay'
    -if str has no vowels, append 'ay'
*/

function toPigLatin(str) {
    const vowels = /[aeiou]/;
    if (!str.match(vowels)) {
        return str + 'ay';
    }
    function isVowel (c) {
        return vowels.test(c.toLowerCase());
    }
    let x = 0;
    while (!isVowel(str[x]) && x < str.length-1) {
        x += 1;
    }
    return str.slice(x).concat(str.slice(0,x) + (x === 0 ? 'way' : 'ay'));
}

console.log(toPigLatin("consonant"));    // return 'onsonantcoay'
console.log(toPigLatin("algorithm"));    // return 'algorithmway'
console.log(toPigLatin("glove"));        // return 'oveglay'
console.log(toPigLatin("zxcvbnm"));      // return 'zxcvbnmay'

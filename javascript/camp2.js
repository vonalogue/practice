function findLongestWordLength(str) {
    let longest = '';
    let words = str.match(/\S*[^\s]/g);
    for (var x=0; x < words.length; x++) {
        if (words[x].length > longest.length) {
            longest = words[x];
        }
    }
    return longest.length;
}

console.log(findLongestWordLength("The quick brown fox jumped over the lazy dog"));

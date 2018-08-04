/*
Return a 2D array of DNA base pairs (AT or CG) corresponding to each strand in a given string.
Example: "GCG" returns [["G", "C"], ["C","G"],["G", "C"]].
*/

function pairElement(str) {
    const pairs = { 'A': 'T',
                    'T': 'A',
                    'C': 'G',
                    'G': 'C' };
    return str.split('').map(x => [x, pairs[x]]);
}

console.log(pairElement("GCG"));

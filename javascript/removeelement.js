/*
Return an array stripped of elements in optional arguments given after arr.
*/

function destroyer(arr) {
    return arr.filter(x => Array.from(arguments).indexOf(x) == -1);
}

console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3));        // returns [1, 1]

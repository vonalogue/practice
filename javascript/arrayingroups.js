// Return a copy of arr split into groups of size's value, splitting any remainder into its own array at the end.
function chunkArrayInGroups(arr, size) {
    let newArr = [];
    while (arr.length > 0) {
        if (arr.length >= size) {
            newArr.push(arr.splice(0, size));
        } else {
            newArr.push(arr.splice(0, ...arr));
            break;
        }
    }
    return newArr;
}

console.log(chunkArrayInGroups(["a", "b", "c", "d"], 2));    // [['a','b'], ['c','d']]
console.log(chunkArrayInGroups([0, 1, 2, 3, 4, 5], 4));      // [[0, 1, 2, 3], [4, 5]]
console.log(chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6], 3));   // [[0, 1, 2], [3, 4, 5], [6]]

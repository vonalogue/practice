/*
Return the union of unique values found in an arbitrary number of arrays in their original order.
*/

function uniteUnique(...arr) {
    let new_arr = [];
    for (let x=0; x < arr.length; x++) {
        for (let y=0; y < arr[x].length; y++) {
            if (new_arr.indexOf(arr[x][y]) === -1) {
                new_arr.push(arr[x][y]);
            }
        }
    }
    return new_arr;
}

console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]));  // return [1, 3, 2, 5, 4]
console.log(uniteUnique([1, 3, 2], [1, [5]], [2, [4]]));     // return [1, 3, 2, [5], [4]]

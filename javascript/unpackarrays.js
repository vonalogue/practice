/*
"Flatten" an array by placing all of its content in a one-dimensional array, unpacking any
nested arrays if necessary.
*/

function steamrollArray(arr) {
    var flat = [];
    function iterate(a) {
        for (let x of a) {
            if (Array.isArray(x)) {
                iterate(x);
            } else {
                flat.push(x);
            }
        }
    }
    iterate(arr);
    return flat;
}


console.log(steamrollArray([1, [2], [3, [[4]]]]));  // return [1, 2, 3, 4]

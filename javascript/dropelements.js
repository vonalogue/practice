/*
Remove elements that do not satisfy func's condition until the condition is satisfied; then,
keep the rest of the elements, even if they may not satisfy the condition.
*/

function dropElements(arr, func) {
    let idx = arr.findIndex((x) => func(x));
    return idx !== -1 ? arr.splice(idx) : [];
}

console.log(dropElements([6, 9, 3, 1, 2, 5, 7, 8], function(n) {return n < 3;}));   // return [1, 2, 5, 7, 8]
console.log(dropElements([0, 1, 0, 1], function(n) {return n === 1;}));             // return [1, 0, 1]
console.log(dropElements([1, 2, 3, 9, 2], function(n) { return n > 2;}));           // return [3, 9, 2]
console.log(dropElements([1, 2, 3, 4], function(n) { return n >= 3; }));            // return [3, 4]
console.log(dropElements([1, 2, 3, 4, 3, 2], function(n) { return n > 5; }));       // return []

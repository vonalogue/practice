/* 
Rough implementation of array.prototype.some() that returns an element instead of a boolean.
Finds an element in arr that satisfies the conditional expression returned by func, returning
undefined if otherwise.
*/
function findElement(arr, func) {
    for (var x=0; x < arr.length; x++) {
        if (func(arr[x])) { return arr[x]; }
    }
  return undefined;
}

console.log(findElement([1, 2, 3, 4], num => num % 2 === 0));

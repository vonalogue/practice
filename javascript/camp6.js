function findElement(arr, func) {
    for (var x=0; x < arr.length; x++) {
        if (func(arr[x])) { return arr[x]; }
    }
  return undefined;
}

console.log(findElement([1, 2, 3, 4], num => num % 2 === 0));

function frankenSplice(arr1, arr2, n) {
    let newArray = arr2.slice();
    newArray.splice(n, 0, ...arr1);
    return newArray.slice()
}

console.log(frankenSplice([1, 2, 3], [4, 5, 6], 1));     // return [4, 1, 2, 3, 5, 6]

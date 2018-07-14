function mutation(arr) {
    arr[0] = arr[0].toLowerCase();
    return arr[1].toLowerCase().split('').filter(c => arr[0].indexOf(c) != -1).length == arr[1].length;
}

console.log(mutation(["hello", "hey"]));        // false
console.log(mutation(["voodoo", "no"]));        // false

console.log(mutation(["Hello", "hell"]));       // true
console.log(mutation(["Hello", "hhell"]));      // true
console.log(mutation(["Ahello", "hhell"]));     // true

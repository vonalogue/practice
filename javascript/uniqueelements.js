/*
Return an array containing all elements that are unique to one of two arrays provided.
*/

function uniqueElements(arr1, arr2) {
    let new1 = arr1.filter(x => arr2.indexOf(x) == -1);
    let new2 = arr2.filter(x => arr1.indexOf(x) == -1);
    return new1.concat(new2);
}

console.log(uniqueElements([1, 2, 3, 5], [1, 2, 3, 4, 5]));       // return [4]
console.log(uniqueElements(['hot dogs', 'chimpanzee soup'], ['coca-cola', 'hot dogs']));     // return ['chimpanzee soup', 'coca-cola']

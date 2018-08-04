// Return an array of all objects in collection that contain all properties in source.

function objectsWithProps(collection, source) {
    let results = [];
    function hasAllProperties (o) {
        for (let p in source) {
            if (o[p] != source[p]) {
                return false;
            }
        }
        return true;
    }
    return collection.filter(o => hasAllProperties(o));
}

// return [{ first: "Tybalt", last: "Capulet" }]
console.log(objectsWithProps([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" }));

// return [{ "apple": 1, "bat": 2 }, { "apple": 1, "bat": 2, "cookie": 2 }]
console.log(objectsWithProps([{ "apple": 1, "bat": 2 }, { "bat": 2 }, { "apple": 1, "bat": 2, "cookie": 2 }], { "apple": 1, "bat": 2 }))

// Check whether property pre evaluates to true in collection's objects, regardless of its data type.
function truthCheck(collection, pre) {
  for (let o of collection) {
      if (Boolean(o[pre]) == false) {
          return false;
      }
  }
  return true;
}


console.log(truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex"));

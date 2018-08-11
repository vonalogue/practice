// Create a Person object with getters and setters.

var Person = function(firstAndLast) {
  let [first, last] = firstAndLast.split(' ');

  this.setFullName = (name) => { [first, last] = name.split(' '); };
  this.setLastName = (name) => { last = name; };
  this.setFirstName =(name) => { first = name; };

  this.getFullName = () => { return first + ' ' + last };
  this.getFirstName = () => { return first; };
  this.getLastName = () => { return last; };

  return firstAndLast;
};

var bob = new Person('Bob Ross');

console.log(bob.getFullName());
bob.setFirstName("Haskell")
console.log(bob.getFirstName());
console.log(bob.getFullName());
console.log(Object.keys(bob));

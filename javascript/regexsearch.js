/* 
Simple demonstration of using a regular expression to find words sandwiched within an arbitrary
number of spaces.
*/

var data = {
    str: '  Test one  ',
    regex: /^\s*(.*?)\s*$/g
};

const { str, regex } = data;

var search = (s, r) => {
    var result = s.match(r);
    if (!result) {
        return "No matches.";
    }
    return result[0] + '\n' + result.length + ' match(es)';
};
console.log(search(str, regex));
console.log(str.replace(regex, '$1'));

// Solutions rejected in error (ES6 problems)
//
// resultDisplayArray = arr.map(x => `<li class="text-warning">${x}</li>`);


// Handy examples of syntax, problem-solving, etc.
//
// squaredIntegers.filter(x => x == Math.floor(x)).map(x => x**2);

// Check whether a phone number is in valid US format. Inclusion of the country code is optional.

function telephoneCheck(str) {
    const format = /^1?\s?(\d{3}|\(\d{3}\))[-\s]?\d{3}[-\s]?\d{4}$/;
    return format.test(str);
}

console.log(telephoneCheck("1 555 555 5555"));          // return true
console.log(telephoneCheck("3 555 555 5555"));          // return false


/*
To do it the long way...

const formats = [ /^1?\s?\d{10}$/,                         // 5555555555
                    /^1?\s?\d{3}-\d{3}-\d{4}$/,            // 555-555-5555
                    /^1?\s?\d{3}\s\d{3}\s\d{4}$/,          // 555 555 5555
                    /^1?\s?\(\d{3}\)\d{3}-\d{4}$/,         // (555)555-5555
                    /^1?\s?\(\d{3}\)\s\d{3}-\d{4}$/,       // (555) 555-5555
                    /^1\s\d{3}\s\d{3}\s\d{4}$/,            // 1 555 555 5555
];

*/

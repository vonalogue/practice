// Encode a string in ROT13 format.

function rot13(str) {
    let code = str.split('');
    let ASCII = (x) => { return str.charCodeAt(x); }
    let codeToChar = (n) => { return String.fromCharCode(n); }

    for (let c=0; c < str.length; c++) {
        if (ASCII(c) >= 65 && ASCII(c) <= 90 ) {
            code[c] = ASCII(c) <= 77 ? codeToChar(ASCII(c) + 13) : codeToChar(ASCII(c) - 13);
        }
    }
    return code.join('');
}

// Change the inputs below to test
console.log(rot13("SERR PBQR PNZC"));

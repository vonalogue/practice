// Return a string with special characters as HTML entities.

function convertHTML(str) {
    const entities = { '&': '&amp;',
                        '<': '&lt;',
                        '>': '&gt;',
                        '\'': '&apos;',
                        '\"': '&quot;'
    }
    return str.replace(/[&<>\'"]/g, (c) => entities[c]);
}

console.log(convertHTML("Dolce & Gabbana"));            // return Dolce &​amp; Gabbana
console.log(convertHTML('Stuff in "quotation marks"')); // return Stuff in &​quot;quotation marks&​quot;.
console.log(convertHTML("Jimmy's Fate"));               // return Schindler&​apos;s List.

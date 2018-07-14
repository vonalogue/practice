function truncateString(str, num) {
    let newStr = str.slice(0, num);
    if (str.length > num) {
        newStr += '...';
    }
    return newStr;
}

console.log(truncateString("A-tisket a-tasket A green and yellow basket", 8));
console.log(truncateString("A-", 1));
console.log(truncateString("A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length + 2));

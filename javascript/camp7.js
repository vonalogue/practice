function titleCase(str) {
    return str.replace(/\S*[^\s]/g, w => w[0].toUpperCase()+w.toLowerCase().substr(1));
}

console.log(titleCase("I'm a little tea pot"));

//return words.map(w => w[0].toUpperCase()+w.toLowerCase().slice(1,w.length)).reduce((h, j) => h + ' ' + j);

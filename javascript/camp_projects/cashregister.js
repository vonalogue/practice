function checkCashRegister(price, cash, cid) {
    const values = {    'PENNY': 0.01,
                        'NICKEL': 0.05,
                        'DIME': 0.10,
                        'QUARTER': 0.25,
                        'ONE': 1.00,
                        'FIVE': 5.00,
                        'TEN': 10.00,
                        'TWENTY': 20.00,
                        'ONE HUNDRED': 100.00,
    };
    var owed = cash - price;
    var amounts = cid.map(d => [ d[0], Math.round(d[1] / values[d[0]]) ]);
    var change = { status: '', change: [] };

    var drawerTotal = () => {
        let sum = 0;
        for (let x of cid) {
            sum += x[1];
        }
        return sum;
    }
    var changeTotal = () => {
        let sum = 0;
        for (let x=0; x < change.change.length; x++) {
            sum += change.change[x][1];
        }
        return sum;
    }
    if (drawerTotal() < owed) {
        change.status = 'INSUFFICIENT_FUNDS';
        return change;
    } else if (drawerTotal() == owed) {
        change.status = 'CLOSED';
        change.change = cid;
    } else {
        change.status = 'OPEN';
    }

    function makeChange(ch) {
        let d = '';
        let a = 0;
        for (let x of amounts) {
            if (ch >= values[x[0]] && (change.change.every(e => e.indexOf(x[0]) === -1) && x[1] !== 0)) {
                d = x[0];
                a = x[1];
            }
        }
        let q = Math.floor(ch/values[d]);
        q = q < a ? q%a : a;
        let r = ch - values[d]*q;
        if (values[d]*q)
            { change.change.push([d, values[d]*q]); }
        if (r)
            { return makeChange(r.toFixed(2)); }
    }
    makeChange(owed);
    if (changeTotal() < owed) {
        change.status = 'INSUFFICIENT_FUNDS';
        change.change = [];
        return change;
    }
    return change;
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));

/*
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

//return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}

console.log(checkCashRegister(30, 90, [ ['PENNY', 0],
                                        ['NICKEL', 0],
                                        ['DIME', 0],
                                        ['QUARTER', 0],
                                        ['ONE', 0],
                                        ['FIVE', 10.00],
                                        ['TEN', 30.00],
                                        ['TWENTY', 40.00],
                                        ['ONE HUNDRED', 100.00] ]));

// change owed: $60
// {status: "OPEN", change: [["TWENTY", 40], [["TEN", 20]]]};

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100] ]));


console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
*/

// {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}

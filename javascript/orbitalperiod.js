/*
Calculate the orbital period of a satellite object in accordance with Kepler's Third Law.
Then, remove the average altitude property and add the orbital period property with its value
set to the calculation.
*/

function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;

  for (let o of arr) {
      o.orbitalPeriod = Math.round(Math.sqrt(Math.pow(o.avgAlt + earthRadius, 3) / GM) * (2*Math.PI));
      delete o.avgAlt;
  }
  return arr;
}

console.log(orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]));

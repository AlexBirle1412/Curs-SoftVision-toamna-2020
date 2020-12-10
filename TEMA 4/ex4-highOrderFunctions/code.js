let arr = [1, -2, 6, -7, 10, 9, 14, true, false, null, undefined];

let filteredArr = arr.filter((element, index) => {
  return typeof element === "number";
});
let mapArr = filteredArr.map((element, index) => {
  return element * 10;
});
let result = mapArr.reduce((element, acc) => {
  return (acc += element);
}, 0);

console.log(filteredArr);
console.log(mapArr);
console.log(result);

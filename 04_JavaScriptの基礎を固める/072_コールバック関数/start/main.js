function doSomething(a, b, callback) {
  const result = callback(a, b);
  console.log(result);
}

function multiply(a, b) {
  return a * b;
}

function plus(a, b) {
  return a + b;
}

doSomething(2, 2, multiply);  // => 4
doSomething(4, 5, plus);  // => 9

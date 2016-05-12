'use strict';

function findLetterTerm(n) {
  let previousMultiple;
  const letters = ['A', 'B', 'C', 'D'];
  // console.log(n)
  for (let i = n; i >= 0; i--) {
    if (i % 4 === 0) {
      previousMultiple = i;
      break;
    }
  }

  return letters[n-previousMultiple];
}

module.exports = findLetterTerm;

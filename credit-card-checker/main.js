// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

// Add your functions below:

//Function validateCred(array) that return true if the array contains digits of a valid credit card number, and false when it's invalid:

/*=====MY FIRST CODE======= */

const validateCred = (array) => {
  // Create a reversed array to iterate from right to left of original array
  // (!!! reverse() CHANGES ORIGINAL ARRAY !!! Don't forget reverse it back!!!):
  let reversed = array.reverse();

  //Create two separate arrays, containing odd indices (everyFirst) and even indices (everyOther):
  let everyOther = reversed.filter((element, index) => {
    return index % 2 === 1;
  });
  let everyFirst = reversed.filter((element, index) => {
    return index % 2 === 0;
  });

  //Double digits of the everyOther array and add them to a new array:
  let doubledArray = [];
  for (element of everyOther) {
    let doubled = element * 2;
    if (doubled > 9) {
      doubled = doubled - 9;
    }
    doubledArray.push(doubled);
  }

  //!!!REVERSE ARRAY BACK!!!
  array.reverse();

  //Get sums of digits in everyFirst and doubledArrays and add them:
  let sum1 = 0;
  for (element of everyFirst) {
    sum1 += element;
  }

  let sum2 = 0;
  for (element of doubledArray) {
    sum2 += element;
  }

  let totalSum = sum1 + sum2;

  //Find modulo and return true or false:
  return totalSum % 10 === 0;
};

/*====END OF MY FIRST CODE ==== */

/*  Refactored code after checking out the solution 

const validateCred = (array) => {
  let totalSum = 0;
  for (let i = array.length - 1; i >= 0; i++) {
    let currentValue = array[i];
    if ((array.length - 1 - i) % 2 === 1) {
      currentValue *= 2;
      if (currentValue > 9) {
        currentValue -= 9;
      }
    }
    totalSum += currentValue;
  }
  return totalSum % 10 === 0;
};

*/

console.log(validateCred(valid1));
console.log(validateCred(invalid1));

const findInvalidCards = (nestedArray) => {
  const invalidCards = [];
  for (array of nestedArray) {
    let validCard = validateCred(array);
    if (!validCard) {
      invalidCards.push(array);
    }
  }
  return invalidCards;
};
//console.log(findInvalidCards(batch));
//console.log(invalidCards);

//To identify the companies that issued invalid cards

const idInvalidCardCompanies = (invalidBatch) => {
  const invalidCompanies = [];
  for (let i = 0; i < invalidBatch.length; i++) {
    switch (invalidBatch[i][0]) {
      case 3:
        if (invalidCompanies.indexOf('Amex (American Express)') === -1) {
          invalidCompanies.push('Amex (American Express)');
        }
        break;
      case 4:
        if (invalidCompanies.indexOf('Visa') === -1) {
          invalidCompanies.push('Visa');
        }
        break;
      case 5:
        if (invalidCompanies.indexOf('MasterCard') === -1) {
          invalidCompanies.push('MasterCard');
        }
        break;
      case 6:
        if (invalidCompanies.indexOf('Discover') === -1) {
          invalidCompanies.push('Discover');
        }
        break;
      default:
        console.log('Company not found');
    }
  }
  return invalidCompanies;
};

console.log(idInvalidCardCompanies([invalid1]));
console.log(idInvalidCardCompanies([invalid2]));
console.log(idInvalidCardCompanies(batch));

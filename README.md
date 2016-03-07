# Callback Hell Refactoring Lab

## Objectives

1. Refactor an async code using named functions
1. Refactor an async code using modules

## Introduction

You've been tasked by your dev team to refactor some ugly code. You colleagues know you are the master of simplifying code, and dealing with callback hell.

The code is converting private information from a CSV format into a JSON with obfuscated credit card numbers. Security is important. That's why this script is hiding all the credit card number digits except the last four. We don't want hackers to get the CC numbers so easily if the data gets compromised!
 
In this lab, you'll start with an ugly, huge and complex looking file, refactor code using named functions and then abstract the code into 3 modules. 

## Instructions

1. Open `mask.js` file. Understand how it's working by looking at the code.
2. Identify three major parts which you can break into separate functions.
3. Create/open `mask2.js`. Abstract the callback on line 6 into `checkFile`, line  8 into `readFile` and line 33 into `writeFile` named/hoisted functions. 
4. Bonus: abstract the logic which masks the credit card numbers.
5. Verify by running tests
6. Create/open `mask3.js`. Abstract `checkFile` into a module `mask3-check-file.js`. Use that module in `mask3.js`. Find a way to pass `inputFile`, `customers` and `callback` variables to the module. 
7. Repeat step 6 for `readFile` and `writeFile` by creating `mask3-read-file.js` and `mask3-write-file.js` respectively.
8. Verify by running tests.

The original file `mask.js`:

```js
var fs = require('fs')
var inputFile = './customers.csv'

module.exports = function(callback){
  var customers = []
  fs.stat(inputFile, function(error, stats){ // FIRST CALLBACK
    if (stats.isFile()) {
      var customersCSV = fs.readFile(inputFile, 'utf8', function(error, customersCSV){ // SECOND CALLBACK
        if (!error) {
          customersLines = customersCSV.split('\n')
          customersLines.forEach(function(customerLine){
            var customerArray = customerLine.split(',')
            customers.push({
              id: customerArray[0],
              firstName: customerArray[1],
              lastName: customerArray[2],
              email: customerArray[3],
              city: customerArray[4],
              creditCard: customerArray[5],
              creditCardNumber: customerArray[6]
                .split('')
                .map(function(number, index, list){
                    if (index >= list.length -4) {
                      return number
                    } else {
                      return '*'
                    }
                  })
                .join('') // BONUS FUNCTION!
            })
          })
          var customersJSON = JSON.stringify(customers, null, 2)
          fs.writeFile('./customers.json', customersJSON, 'utf-8', function(error){ // THIRD CALLBACK
            if (!error) {
              return callback(null, customers)
            } else {
              return callback(error)
            }
          })
        } else {
          return callback(error)
        }
      })
    } else {
      console.error('The input CSV file is not found')
    }
  })
}
```

### Extra Info

The modularized script will behave wit this flow:

```
test/index.js
⤷mask3.js
  	⤷mask3-check-file.js
  		⤷mask3-read-file.js
  			⤷mask3-write-file.js
  				⤷test/index.js (callback)
```
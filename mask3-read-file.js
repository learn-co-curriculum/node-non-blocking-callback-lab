var fs = require('fs')

function mask (creditCardNumber) {
  return creditCardNumber.split('').map(function(number, index, list){
    if (index >= list.length -4) return number
    else return '*'
  }).join('')
}

module.exports = function(inputFile, customers, callback){
  var writeFile = require('./mask3-write-file')(inputFile, customers, callback)
  return function readFile(error, customersCSV){
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
          creditCardNumber: mask(customerArray[6])
        })
      })
      var customersJSON = JSON.stringify(customers, null, 2)
      fs.writeFile('./customers.json', customersJSON, 'utf-8', writeFile)
    } else {
      return callback(error)
    }
  }
}
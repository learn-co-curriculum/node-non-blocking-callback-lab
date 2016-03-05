var fs = require('fs')
var inputFile = './customers.csv'
function mask (creditCardNumber) {
  return creditCardNumber.split('').map(function(number, index, list){
    if (index >= list.length -4) return number
    else return '*'
  }).join('')
}

module.exports = function(callback){
  function checkFile (error, stats){
    if (stats.isFile()) {
      var customersCSV = fs.readFile(inputFile, 'utf8', readFile)
    } else {
      console.error('The input CSV file is not found')
    }
  }
  function readFile(error, customersCSV){
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
  function writeFile(error){
    if (!error) {
      return callback(null, customers)
    } else {
      return callback(error)
    }
  }  
  var customers = []
  fs.stat(inputFile, checkFile)
}
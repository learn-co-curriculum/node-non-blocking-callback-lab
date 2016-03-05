var fs = require('fs')
var inputFile = './customers.csv'

module.exports = function(callback){
  var customers = []
  fs.stat(inputFile, function(error, stats){
    if (stats.isFile()) {
      var customersCSV = fs.readFile(inputFile, 'utf8', function(error, customersCSV){
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
                .join('')
            })
          })
          var customersJSON = JSON.stringify(customers, null, 2)
          fs.writeFile('./customers.json', customersJSON, 'utf-8', function(error){
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
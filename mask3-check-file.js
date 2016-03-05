var fs = require('fs')

module.exports = function(inputFile, customers, callback){
  var readFile = require('./mask3-read-file')(inputFile, customers, callback)
  return function checkFile (error, stats){
    if (stats.isFile()) {
      var customersCSV = fs.readFile(inputFile, 'utf8', readFile)
    } else {
      console.error('The input CSV file is not found')
    }
  }
}
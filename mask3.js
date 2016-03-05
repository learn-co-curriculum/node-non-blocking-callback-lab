var fs = require('fs')
var inputFile = './customers.csv'

module.exports = function(callback){
  var customers = []
  var checkFile = require('./mask3-check-file')(inputFile, customers, callback)
  fs.stat(inputFile, checkFile)
}
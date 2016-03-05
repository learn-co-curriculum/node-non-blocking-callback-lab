var fs = require('fs')

module.exports = function(inputFile, customers, callback){
  return function writeFile(error){
    if (!error) {
      return callback(null, customers)
    } else {
      return callback(error)
    }
  }
}
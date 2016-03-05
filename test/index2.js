var expect = require('chai').expect
var fs = require('fs')
var path = require('path')
var moduleFile = '../mask2.js'

describe('mask2.js', function () {
  before(function(done){
    fs.unlink(path.join(__dirname, '../customers.json'), function(){
      done()
    })
  })
  it('must work by matching the resuls in test/customers.json', function(done){
    var mask = require(path.join(__dirname, moduleFile))
    mask(function(error, maskedData){
      expect(error).to.be.null
      var maskedTestData = require('./customers.json')
      expect(maskedData).to.deep.equal(maskedTestData)
      done()
    })
  })
  it('must have readFile ', function(done){
    var mask = fs.readFileSync(path.join(__dirname, moduleFile), 'utf8')
    expect(mask).to.contain('readFile')
    done()
  })
  it('must have writeFile ', function(done){
    var mask = fs.readFileSync(path.join(__dirname, moduleFile), 'utf8')
    expect(mask).to.contain('writeFile')
    done()
  })
  it('must create customers.json', function(done){
    var stats
    try {
       stats = fs.statSync(path.join(__dirname, '../customers.json'))
    } catch(e){
      expect(e).to.be.null
    }
    expect(stats).to.not.be.undefined
    expect(stats.isFile()).to.equal(true)
    done()
  })
})

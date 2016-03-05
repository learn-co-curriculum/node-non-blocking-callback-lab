var expect = require('chai').expect
var fs = require('fs')
var path = require('path')

describe('mask.js', function () {
  before(function(done){
    fs.unlink(path.join(__dirname, '../customers.json'), function(){
      done()
    })
  })
  it('must work', function(done){
    var mask = require(path.join(__dirname, '../mask'))
    mask(function(error, maskedData){
      expect(error).to.be.null
      var maskedTestData = fs.readFileSync('./test/customers.json', 'utf8')
      expect(maskedData).to.equal(maskedTestData)
      done()
    })
  })
  it('must have readFile ', function(done){
    var mask = fs.readFileSync(path.join(__dirname, '../mask.js'), 'utf8')
    expect(mask).to.contain('readFile')
    done()
  })
  it('must have writeFile ', function(done){
    var mask = fs.readFileSync(path.join(__dirname, '../mask.js'), 'utf8')
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

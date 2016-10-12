const webhooks = require('../routes/webhooks.js');
const reqres = require('reqres');
const chai = require('chai');
const should = chai.should();
chai.use(require('sinon-chai'));

describe('webhooks.js', function() {

  let req, res;

  beforeEach(function () {
    req = reqres.req({ method: 'POST', url: '/test', body: { event: 'mocha test!' } });
    res = reqres.res();
  });

  describe('/test', function() {

    

    it('works', function(done){
      webhooks.handle(req, res);
      res.on('end', function () {
        res.json.should.have.been.calledWithExactly({ event: 'mocha test!' });
        done();
      });

    });

  });

});
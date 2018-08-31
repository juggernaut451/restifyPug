var hippie = require('hippie');
var server = require('../index');

describe('Server', function () {
  describe('/users endpoint', function () {
    it('returns all user ', function (done) {
      hippie(server)
        .json()
        .get('/user')
        .expectStatus(200)
        .end(done);
    });
    it('create user ', function (done) {
        hippie(server)
          .json()
          .post('/user')
          .send({"name":"test", "phone":9898989898, "email":"test@test.com"})
          .expectStatus(200)
          .end(done);
      });
  });
});
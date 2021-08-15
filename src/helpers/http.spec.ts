import { assert } from 'chai';
import HTTPTransport from './http';

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth/');

describe('Test Http', () => {
  it('Get should add paarmeters to query from options', (done) => {
    http
      .get('user', { data: { userId: '111' } })
      .then((result: XMLHttpRequest) => {
        assert.equal(result.responseURL, 'https://ya-praktikum.tech/api/v2/auth/user?userId=111');
        done();
      })
      .catch(done);
  });
  it('Should set data as body if method not GET', (done) => {
    http
      .post('signin', { data: { login: 'test', password: 'test' } })
      .then((result: XMLHttpRequest) => {
        assert.equal(result.responseURL, 'https://ya-praktikum.tech/api/v2/auth/signin');
        done();
      })
      .catch(done);
  });
});

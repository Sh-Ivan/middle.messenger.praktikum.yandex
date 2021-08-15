import 'jsdom-global';
import { assert } from 'chai';
import Router from './Router';

// eslint-disable-next-line
// @ts-ignore
global.DOMParser = window.DOMParser;

const router = new Router('/');

describe('Router', () => {
  it('Use should change routes length ', () => {
    router.use('/', {});
    router.use('/login', {});
    assert.equal(router.routes.length, 2);
  });
});

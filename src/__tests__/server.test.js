'use strict';

const supertest = require('supertest');

const { app } = require('./../server.js');

const mockRequest = supertest(app);

describe('the server', () => {
  it('responds with 500 on error route', () => {
    return mockRequest
      .get('/err')
      .then( results => {
        expect(results.status).toBe(500);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });
  it('responds with 404 on invalid route', () => {
    return mockRequest
      .get('/errasdf')
      .then( results => {
        expect(results.status).toBe(404);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });
  it('responds with 200 on valid route', () => {
    return mockRequest
      .get('/')
      .then( results => {
        expect(results.status).toBe(200);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });
  it('responds properly on post to /save route', () => {

    const obj = {name: "test"};
    return mockRequest
      .post('/save')
      .send(obj)
      .then( results => {
        expect(results.status).toBe(200);
        expect(results.body).toEqual(obj);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });



})

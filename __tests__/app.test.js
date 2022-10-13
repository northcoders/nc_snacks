const request = require('supertest');
const app = require('../app');
const db = require('../db');

afterAll(() => {
  if (db.end) db.end();
});

describe('GET /api/snacks', () => {
  test('status:200, responds with an array of snack objects', () => {
    return request(app)
      .get('/api/snacks')
      .expect(200)
      .then(({ body }) => {
        const { snacks } = body;
        expect(snacks).toBeInstanceOf(Array);
        expect(snacks).toHaveLength(7);
        snacks.forEach((snack) => {
          expect(snack).toMatchObject({
            snack_id: expect.any(Number),
            snack_name: expect.any(String),
            flavour_text: expect.any(String)
          });
        });
      });
  });
});
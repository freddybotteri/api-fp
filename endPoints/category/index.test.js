
const request = require('supertest');
const faker = require('faker');

describe('Server category', () => {

    let app;
    beforeAll(async () => {
        app = require('../../server');
    });

    afterAll((done) => {
        return new Promise((resolve, reject) => {
            app.close((err) => {
                if (err) reject(err);
                resolve();
            });
        });
    });

    it('should Execute POST and save', async() => {
        const response = await request(app)
            .post('/categories/')
            .send({
                'name': faker.name.firstName(),
                'description':faker.name.firstName()
            })
            .set('LAB-AUTH','dfdf')
            .set('Content-Type','application/json');
        expect(response.statusCode).toEqual(200);

    });

});
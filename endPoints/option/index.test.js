
const request = require('supertest');
const faker = require('faker');

describe('Server option', () => {

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
            .post('/options/')
            .send({
                'text': '<h1><strong>longitud mas de 50 caracteres 505050505 lorem lore</strong></h1>',
                'order': 1,
                'multimedia': {
                    type: 'image',
                    video: {
                        type: 'youtube',
                        id: '345ert',
                    },
                    image: {
                        path: faker.internet.url(),
                        alt: 'alternative text'
                    },
                },
            })
            .set('LAB-AUTH','dfdf')
            .set('Content-Type','application/json');
        //console.log(response.text)
        expect(response.statusCode).toEqual(200);

    });

});
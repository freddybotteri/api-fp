
const request = require('supertest');
const faker = require('faker');
const { Functional } = require('../../nosql');

describe('Server functional', () => {

    let app;
    beforeAll(async () => {
        app = require('../../server');
        await Functional.remove({});
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

        const resCategory = await request(app)
            .post('/categories/')
            .send({
                'name': faker.company.companyName(),
                'description': 'categories description'
            })
            .set('LAB-AUTH','dfdf')
            .set('Content-Type','application/json');

        const functional = await request(app)
            .post('/functionals/')
            .send({
                'user_id': '9843otng8er'
            })
            .set('LAB-AUTH','dfdf')
            .set('Content-Type','application/json');
        //console.log(functional.text)

        const resRandomFunctional = await request(app)
            .get(`/functional/category/${resCategory.body._id}/30/random/`)
            .set('LAB-AUTH','dfdf')
            .set('Content-Type','application/json');

        //console.log(resRandomFunctional.body);

        expect(resRandomFunctional.statusCode).toEqual(200);
        expect(functional.statusCode).toEqual(200);

    });

    it('should save 2 dates and verify that the the list return is in orden ASC', async() => {

        const resCategory = await request(app)
            .post('/categories/')
            .send({
                'name': faker.company.companyName(),
                'description': 'categories description'
            })
            .set('LAB-AUTH','dfdf')
            .set('Content-Type','application/json');

        const functionalOne = await request(app)
            .post('/functionals/')
            .send({
                'name': '9843otng8er',
            })
            .set('LAB-AUTH','dfdf')
            .set('Content-Type','application/json');

        const functionalTwo = await request(app)
            .post('/functionals/')
            .send({
                'user_id': '9843otng8er'
            })
            .set('LAB-AUTH','dfdf')
            .set('Content-Type','application/json');

        const filterData = await request(app)
            .get('/functionals/asc/0/10/')
            .set('Content-Type','application/json')
            .expect('Content-Type', /json/);


        const dataReturned = filterData.body.data;

        const dataDates = dataReturned.reduce(function(result, functional) {
            if (!result.includes(functional.created)) {
                result.push(functional.created);
            }
            return result;
        }, []);

        expect(dataDates[0] < dataDates[1]).toBeTruthy();
        expect(functionalOne.statusCode).toEqual(200);

    });

});
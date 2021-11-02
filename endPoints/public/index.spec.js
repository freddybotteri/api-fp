const publicHandler = require('./index');

const common = () => ({
    public: {},
    publicResponse:
        {
            _id: '2399dsd6dfsl'
        },
    _id: '2399dsd6dfsl',
    cleanString: {
        clean: jest.fn()
    },
    cleanObject: {
        clean: jest.fn()
    },
    converter: {
        clean: jest.fn(),
        functionalByCategory: jest.fn()
    }
});
describe('Endpoints public', () => {

    it('Should return the functional for show in iframe', async () => {
        const req = {
            params: {
                url: ''
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()

        };

        const Functional = {

            findOne: jest.fn(() => {
                return {
                    select: jest.fn(() => {
                        return {
                            populate: jest.fn(() => {
                                return {
                                    populate: jest.fn().mockReturnValue({ _id: common()._id })
                                };
                            })
                        };
                    })
                };
            })
        };


        const cleanString = common().cleanString;
        const cleanObject = common().cleanObject;
        const converter = common().converter;
        await publicHandler({ Functional, cleanString, cleanObject, converter }).get(req, res);

        expect(Functional.findOne.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);

    });

    it('Should return the functional for preview', async () => {
        const req = {
            params: {
                url: 'http://localhost'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const next = jest.fn();

        const Functional = {
            findOne: jest.fn().mockImplementationOnce(() => ({
                select: jest.fn().mockImplementationOnce(() => ({
                    populate: jest.fn().mockResolvedValue({ _id: '1' })
                }))
            }))
        };

        await publicHandler({ Functional }).getPreview(req, res, next);

        expect(res.send.mock.calls).toEqual([
            [{_id:'1'}]
        ]);

    });

});
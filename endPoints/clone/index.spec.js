const cloneHandler = require('./index');

const common = ()=>  ({
    clone: {
    },
    cloneResponse: [
        {_id:'2399dsd6dfsl'},
        {_id:'23uu99dsd6dfsl'},
    ],
    _id:'2399dsd6dfsl',
    cleanString:{
        clean: jest.fn()
    },
    cleanObject:{
        clean: jest.fn()
    },
    converter:{
        clean: jest.fn(),
    },
});
describe('Endpoints clone', () => {

    it('Should return the clone functional',async()=>{
        const req = {
            params:{
                _id:''
            }
        };

        const res = {
            status:jest.fn().mockReturnThis(),
            send:jest.fn()
        };

        const Functional = {
            findOneAnSaveToClone: jest.fn().mockReturnValue({_id:common()._id}),
        };

        await cloneHandler({Functional}).get(req,res);

        expect(Functional.findOneAnSaveToClone.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send.mock.calls).toEqual([[
            {_id:common()._id}
        ]]);

    });



});
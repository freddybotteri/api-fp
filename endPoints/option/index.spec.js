const optionHandler = require('./index');

const common = ()=>  ({
    option: {
        text: 'pro',
        order:1,
    },
    optionResponse: [
        {_id:'2399dsd6dfsl'},
        {_id:'23uu99dsd6dfsl'},
    ],
    _id:'2399dsd6dfsl',
    cleanString:{
        clean: jest.fn()
    }
});
describe('Endpoints option', () => {
    it('should create', async() => {
        const req = {
            body: common().option
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send:jest.fn()
        };

        const Option = {
            create: jest.fn().mockReturnValue({_id:common()._id})
        };

        const cleanString = common().cleanString;
        await optionHandler({Option,cleanString}).post(req,res);

        expect(Option.create.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send.mock.calls).toEqual([
            [{_id:common()._id}]
        ]);

    });

    it('should return 400 is the method save does not return any data', async() => {
        const req = {
            body: common().option
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send:jest.fn(),
            sendStatus: jest.fn()
        };

        const Option = {
            create: jest.fn().mockReturnValue({})
        };
        const cleanString = common().cleanString;
        await optionHandler({Option,cleanString}).post(req,res);

        expect(Option.create.mock.calls.length).toBe(1);
        expect(res.sendStatus.mock.calls).toEqual([[400]]);
    });

    it('Should update when data and id option are correct',async()=>{
        const req = {
            params: {
                option_id:1,
                addVote:1
            },
            body:common().option
        };
        const res = {
            sendStatus:jest.fn().mockReturnThis()
        };

        const Option = {
            updateOne:jest.fn()
        };

        const cleanString = common().cleanString;
        await optionHandler({Option,cleanString}).put(req,res);

        expect(Option.updateOne.mock.calls.length).toBe(1);
        expect(Option.updateOne.mock.calls).toEqual([
            [{_id:req.params.option_id},req.body, { runValidators: true }]
        ]);
        expect(res.sendStatus.mock.calls).toEqual([[201]]);

    });

    it('Should delete',async()=>{

        const req = {
            params: {
                option_id:'fgdfgdff45fg65'
            }
        };
        const res = {
            sendStatus:jest.fn().mockReturnThis()
        };

        const Option = {
            deleteOne:jest.fn()
        };

        await optionHandler({Option}).delete(req,res);

        expect(Option.deleteOne.mock.calls.length).toBe(1);
        expect(Option.deleteOne.mock.calls).toEqual([
            [{_id:req.params.option_id}]
        ]);
        expect(res.sendStatus.mock.calls).toEqual([[204]]);
    });

    it('Should update Votes, added one',async()=>{
        const req = {
            params: {
                option_id:1,
                addVote:1
            },
        };
        const res = {
            sendStatus:jest.fn().mockReturnThis()
        };

        const Option = {
            updateOne:jest.fn()
        };

        const cleanString = common().cleanString;
        await optionHandler({Option,cleanString}).putResult(req,res);

        expect(Option.updateOne.mock.calls.length).toBe(1);
        expect(Option.updateOne.mock.calls).toEqual([
            [{_id:req.params.option_id}, {$inc : {'total_votes' : 1}} , { runValidators: true }]
        ]);
        expect(res.sendStatus.mock.calls).toEqual([[201]]);

    });

});
const categoryHandler = require('./index');

const common = ()=>  ({
    category: {
        name: 'Clima',
        description: 'clima'
    },
    categoryResponse: [
        {_id:'2399dsd6dfsl'},
        {_id:'23uu99dsd6dfsl'},
    ],
    _id:'2399dsd6dfsl',
    cleanString:{
        clean: jest.fn()
    }
});
describe('Endpoints category', () => {
    it('should create', async() => {
        const req = {
            body: common().category
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send:jest.fn()
        };

        const Category = {
            create: jest.fn().mockReturnValue({_id:common()._id})
        };

        const cleanString = common().cleanString;

        await categoryHandler({Category,cleanString}).post(req,res);

        expect(Category.create.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send.mock.calls).toEqual([
            [{_id:common()._id}]
        ]);

    });

    it('should return 400 is the method save does not return any data', async() => {
        const req = {
            body: common().project
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send:jest.fn(),
            sendStatus: jest.fn()
        };

        const Category = {
            create: jest.fn().mockReturnValue({})
        };
        const cleanString = common().cleanString;
        await categoryHandler({Category,cleanString}).post(req,res);

        expect(Category.create.mock.calls.length).toBe(1);
        expect(res.sendStatus.mock.calls).toEqual([[400]]);
    });

    it('Should return all categories',async()=>{
        const req = {
        };

        const res = {
            status:jest.fn().mockReturnThis(),
            send:jest.fn()
        };

        const Category = {
            countFindAll:jest.fn().mockReturnValue(2),
            find: jest.fn().mockReturnValue(common().categoryResponse),
        };

        await categoryHandler({Category}).get(req,res);

        expect(Category.find.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send.mock.calls).toEqual([
            [{total:2,data:common().categoryResponse}]
        ]
        );

    });

    it('Should return one category',async()=>{
        const req = {
            params: {
                category_id: common()._id
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const Category = {
            findOne: jest.fn().mockReturnValue({_id:common()._id})
        };

        await categoryHandler({Category}).getById(req,res);

        expect(Category.findOne.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);

    });

    it('Should return category filter',async()=>{
        const req = {
            params:{
                order:'asc',
                from:1,
                quantity:10
            }
        };
        const res={
            status:jest.fn().mockReturnThis(),
            send:jest.fn()
        };
        const Category = {
            find: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            countFindAll:jest.fn().mockReturnValue(2),
        };

        await categoryHandler({Category}).getFilter(req,res);

        expect(res.status.mock.calls).toEqual([[200]]);
        expect(req.params.order).toBe('asc');
        expect(req.params.from).toBe(1);
        expect(req.params.quantity).toBe(10);
        expect(res.send.mock.calls.length).toBe(1);
    });

    it('Should update when data and id category are correct',async()=>{
        const req = {
            params: {
                category_id:1
            },
            body:common().category
        };
        const res = {
            status:jest.fn().mockReturnThis(),
            send:jest.fn(),
            sendStatus:jest.fn().mockReturnThis()
        };

        const Category = {
            findByIdAndUpdate:jest.fn()
        };

        const cleanString = common().cleanString;

        await categoryHandler({Category,cleanString}).put(req,res);

        expect(Category.findByIdAndUpdate.mock.calls.length).toBe(1);
        expect(Category.findByIdAndUpdate.mock.calls).toEqual([
            [{_id:req.params.category_id},req.body, { runValidators: true,new:true,useFindAndModify:false }]
        ]);
        expect(res.status.mock.calls).toEqual([[201]]);

    });

    it('Should delete',async()=>{

        const req = {
            params: {
                category_id:'fgdfgdff45fg65'
            }
        };
        const res = {
            sendStatus:jest.fn().mockReturnThis()
        };

        const Category = {
            deleteOne:jest.fn()
        };

        await categoryHandler({Category}).delete(req,res);

        expect(Category.deleteOne.mock.calls.length).toBe(1);
        expect(Category.deleteOne.mock.calls).toEqual([
            [{_id:req.params.category_id}]
        ]);
        expect(res.sendStatus.mock.calls).toEqual([[204]]);
    });

});
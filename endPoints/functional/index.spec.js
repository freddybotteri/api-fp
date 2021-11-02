const functionalHandler = require('./index');

const common = ()=>  ({
    functional: {
        user_id: '9843otng8er',
        sharing: [],
        content: {},
        category_id: '8943in450er',
        url:'soe-er'
    },
    functionalResponse: [
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
        functionalByCategory:  jest.fn().mockReturnValue([{_id:''}]),
        functionalResults: jest.fn(),
        randomResponseImageSetting: jest.fn()
    },
});

describe('Endpoints functional', () => {
    it('should create', async() => {
        const req = {
            body: common().functional
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send:jest.fn()
        };

        const Functional = {
            create: jest.fn().mockReturnValue({_id:common()._id})
        };

        const cleanString = common().cleanString;
        await functionalHandler({Functional,cleanString}).post(req,res);

        expect(Functional.create.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send.mock.calls).toEqual([
            [{_id:common()._id}]
        ]);

    });

    it('should return 400 is the method save does not return any data', async() => {
        const req = {
            body: common().functional
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send:jest.fn(),
            sendStatus: jest.fn()
        };

        const Functional = {
            create: jest.fn().mockReturnValue({})
        };
        const cleanString = common().cleanString;
        await functionalHandler({Functional,cleanString}).post(req,res);

        expect(Functional.create.mock.calls.length).toBe(1);
        expect(res.sendStatus.mock.calls).toEqual([[400]]);
    });

    it('Should update when data and id functional are correct',async()=>{
        const req = {
            params: {
                functional_id:1
            },
            body: {
                user_id:'',
                category_id:'',
                content:[{}],
                description:'',
                date_init:'',
                date_fin:''
            }
        };
        const res = {
            status:jest.fn().mockReturnThis(),
            send:jest.fn()
        };

        const Functional = {
            findByIdAndUpdate:jest.fn()
        };

        const cleanString = common().cleanString;
        await functionalHandler({Functional,cleanString}).put(req,res);

        expect(Functional.findByIdAndUpdate.mock.calls.length).toBe(1);
        expect(Functional.findByIdAndUpdate.mock.calls).toEqual([
            [{_id:req.params.functional_id},req.body, { runValidators: true,new:true,useFindAndModify:false }]
        ]);
        expect(res.status.mock.calls).toEqual([[201]]);

    });

    it('Should patch add question in a functional',async()=>{
        const req = {
            params:{
                functional_id:'435gf5436'
            },
            body:{
                question: 'Some question?',
                context: 'Some context',
                answer: 'Some answer'
            }
        };

        const res = {
            status:jest.fn().mockReturnThis(),
            send:jest.fn()
        };

        const Functional = {
            findByIdAndUpdate: jest.fn(),
        };

        await functionalHandler({Functional}).patchQuestionAdd(req,res);

        expect(Functional.findByIdAndUpdate.mock.calls.length).toEqual(1);
        expect(res.status.mock.calls).toEqual([[201]]);


    });

    it('Should patch update a question in a functional',async()=>{
        const req = {
            params:{
                functional_id:'435gf5436',
                question_id:''
            },
            body:{
                question: 'Some question?',
                context: 'Some context',
                answer: 'Some answer'
            }
        };

        const res = {
            status:jest.fn().mockReturnThis(),
            send:jest.fn()
        };

        const Functional = {
            updateQuestionInFunctional: jest.fn(),
        };
        const cleanString = common().cleanString;
        const cleanObject = common().cleanObject;
        await functionalHandler({Functional,cleanString,cleanObject}).patchQuestionUpdate(req,res);

        expect(Functional.updateQuestionInFunctional.mock.calls.length).toEqual(1);
        expect(res.status.mock.calls).toEqual([[201]]);


    });

    it('Should return all functional',async()=>{
        const req = {
        };

        const res = {
            status:jest.fn().mockReturnThis(),
            send:jest.fn()
        };

        const Functional = {
            countFindAll: jest.fn().mockReturnThis(),
            find: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
            populate: jest.fn().mockReturnThis()
        };

        await functionalHandler({Functional}).get(req,res);

        expect(Functional.find.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);
    });

    it('Should return one functional',async()=>{
        const req = {
            params: {
                functional_id: common()._id
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const Functional = {
            findFunctionalById: jest.fn().mockReturnValue({_id:common()._id})
        };

        await functionalHandler({Functional}).getById(req,res);

        expect(Functional.findFunctionalById.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send.mock.calls).toEqual([
            [{_id:common()._id}]]
        );

    });

    it('Should get a list of functionals by word in question',async()=>{

        const req = {
            params:{
                word:'',
                order:'',
                from:'',
                quantity:''
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnValue({total:2,data:[{_id:'2'}]})
        };

        const Functional = {
            find: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            countFindAll:jest.fn().mockReturnThis()
        };
        const cleanString = common().cleanString;

        await functionalHandler({Functional,cleanString}).getFunctionalByWordInQuestion(req,res);

        expect(Functional.find.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);

    });


    it('Should return functional results',async()=>{
        const req = {
            params: {
                functional_id: common()._id
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const Functional = {
            findFunctionalResult: jest.fn().mockReturnValue({_id:common()._id})
        };

        const cleanString = common().cleanString;
        const cleanObject = common().cleanObject;
        const converter = common().converter;

        await functionalHandler({Functional,cleanString,cleanObject,converter}).getResults(req,res);

        expect(Functional.findFunctionalResult.mock.calls.length).toBe(1);
        expect(converter.functionalResults.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);

    });

    it('Should return one or more functionals by category',async()=>{

        const req = {
            params:{
                category_id:'33',
                quantity: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const Functional = {
            find: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
        };

        const cleanString = common().cleanString;
        const cleanObject = common().cleanObject;
        const converter = common().converter;

        await functionalHandler({Functional,cleanString,cleanObject,converter}).getFunctionalRandom(req,res);

        expect(Functional.find.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);
    });

    it('Should return all functional order',async()=>{
        const req = {
            params: {
                order:'asc'
            }
        };

        const res = {
            status:jest.fn().mockReturnThis(),
            send:jest.fn()
        };

        const Functional = {
            countFindAll: jest.fn().mockReturnThis(),
            findFunctionalOrder:jest.fn().mockReturnThis()
        };

        const cleanString = common().cleanString;
        const cleanObject = common().cleanObject;
        const converter = common().converter;
        await functionalHandler({Functional,cleanString,cleanObject,converter}).getFunctionalOrder(req,res);

        expect(Functional.findFunctionalOrder.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);
    });

    it('Should return all functional order with limit',async()=>{
        const req = {
            params: {
                order:'asc',
                from:'1',
                quantity:'10'
            }
        };

        const res = {
            status:jest.fn().mockReturnThis(),
            send:jest.fn()
        };

        const Functional = {
            countFindAll: jest.fn().mockReturnThis(),
            findFunctionalOrderLimit:jest.fn().mockReturnThis()
        };

        const cleanString = common().cleanString;
        const cleanObject = common().cleanObject;
        const converter = common().converter;
        await functionalHandler({Functional,cleanString,cleanObject,converter}).getFunctionalOrderLimit(req,res);

        expect(Functional.findFunctionalOrderLimit.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);
    });


    it('Should return all functional filter by category',async()=>{
        const req = {
            params:{
                category_id:'',
                order:'',
                from:'',
                quantity:''
            }
        };

        const res = {
            status:jest.fn().mockReturnThis(),
            send:jest.fn()
        };

        const Functional = {
            findFunctionalByCategory: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            countFindAll: jest.fn().mockReturnThis(),
        };

        const cleanString = common().cleanString;
        const cleanObject = common().cleanObject;
        const converter = common().converter;
        await functionalHandler({Functional,cleanString,cleanObject,converter}).getFunctionalByCategory(req,res);

        expect(Functional.findFunctionalByCategory.mock.calls.length).toBe(1);
        expect(converter.functionalByCategory.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);

    });

    it('Should update public estatus',async()=>{
        const req = {
            params:{
                functional_id: 'fdsfie8fve89e'
            },
            body:{
                public:true
            }
        };
        const res = {
            sendStatus:jest.fn()
        };
        const Functional = {
            updateOne:jest.fn()
        };

        await functionalHandler({Functional}).putPublic(req,res);

        expect(Functional.updateOne.mock.calls.length).toBe(1);
        expect(res.sendStatus.mock.calls).toEqual([[201]]);
    });

    it('Should catch error when try to update public status',async()=>{
        const req = {
            params:{}
        };
        const res = {
            status:jest.fn().mockReturnThis(),
            send:jest.fn()
        };

        const Functional = {
            updateOne: jest.fn(),
        };
        const next = jest.fn();

        try {
            await functionalHandler({Functional}).putPublic(req,res,next);
        } catch (e) {
            expect(next.mock.calls.length).toBe(1);
        }
    });

    it('Should update enable estatus',async()=>{
        const req = {
            params:{
                functional_id: 'fdsfie8fve89e'
            },
            body:{
                enable:true
            }
        };
        const res = {
            sendStatus:jest.fn()
        };
        const Functional = {
            updateOne:jest.fn()
        };

        await functionalHandler({Functional}).putEnable(req,res);

        expect(Functional.updateOne.mock.calls.length).toBe(1);
        expect(res.sendStatus.mock.calls).toEqual([[201]]);
    });

    it('Should catch error when try to update enable status',async()=>{
        const req = {
            params:{}
        };
        const res = {
            status:jest.fn().mockReturnThis(),
            send:jest.fn()
        };

        const Functional = {
            updateOne: jest.fn(),
        };
        const next = jest.fn();

        try {
            await functionalHandler({Functional}).putEnable(req,res,next);
        } catch (e) {
            expect(next.mock.calls.length).toBe(1);
        }
    });

    it('Should return one or more functionals by user_id',async()=>{

        const req = {
            params:{
                user_id: '1'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const Functional = {
            find: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            countFindAll: jest.fn()
        };

        await functionalHandler({Functional}).getFunctionalByUserId(req,res);

        expect(Functional.find.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);
    });

    it('Should get a list of functionals by word and user id',async()=>{

        const req = {
            params:{
                user_id:'',
                word:'',
                order:'',
                from:'',
                quantity:''
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnValue({total:2,data:[{_id:'2'}]})
        };

        const Functional = {
            find: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            countFindAll:jest.fn().mockReturnThis()
        };
        const cleanString = common().cleanString;

        await functionalHandler({Functional,cleanString}).getFunctionalByUserIdWordInQuestion(req,res);

        expect(Functional.find.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);

    });

    it('Should get a list of functionals by  user id and filter',async()=>{

        const req = {
            params:{
                user_id:'',
                filter_id:'',
                order:'',
                from:'',
                quantity:''
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnValue({total:2,data:[{_id:'2'}]})
        };

        const Functional = {
            find: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            countFindAll:jest.fn().mockReturnThis()
        };
        const cleanString = common().cleanString;

        await functionalHandler({Functional,cleanString}).getFunctionalByUserIdFilter(req,res);

        expect(Functional.find.mock.calls.length).toBe(1);
        expect(res.status.mock.calls).toEqual([[200]]);

    });

});
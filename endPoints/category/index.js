module.exports = ({Category,cleanString}) => ({

    get: async(req,res,next)=> {
        try {
            const data = await Category.find({});
            const total = await Category.countFindAll({});
            const response = {
                total: total,
                data:data
            };
            res.status(200).send(response);
        }catch(err){
            next(err);
        }
    },
    getFilter: async(req,res,next)=>{
        try{
            const data = await Category.find({}).sort({
                name: req.params.order
            }).skip(Number(req.params.from)).limit(Number(req.params.quantity));
            const total = await Category.countFindAll({});
            const response = {
                total:total,
                data:data
            };
            res.status(200).send(response);
        }catch(err){
            next(err);
        }
    },
    getById: async(req,res,next)=> {
        try {
            const data = await Category.findOne({_id:req.params.category_id});
            res.status(200).send(data);
        }catch(err){
            next(err);
        }
    },
    post : async(req,res,next)=> {
        try{
            const data = await Category.create(req.body);
            if(Object.keys(data).length !== 0){
                return res.status(200).send(data);
            }
            res.sendStatus(400);
        }catch(err){
            next(err);
        }
    },
    put: async(req,res,next)=>{
        try {
            if(req.body.name){
                const tagGenerated = cleanString.clean(req.body.name);
                req.body.tag = tagGenerated;
            }
            const data = await Category.findByIdAndUpdate({_id:req.params.category_id},req.body,{ runValidators: true ,new:true,useFindAndModify:false});
            res.status(201).send(data);
        }catch(err){
        	next(err);
        }
    },
    delete: async(req,res,next)=> {
        try{
            await Category.deleteOne({_id:req.params.category_id});
            return res.sendStatus(204);
        }catch (err) {
            next(err);
        }
    }

});
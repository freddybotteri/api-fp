module.exports = ({Option,cleanString}) => ({


    post : async(req,res,next)=> {
        try{
            const tagGenerated = cleanString.clean(req.body.text);
            req.body.tag = tagGenerated;
            const data = await Option.create(req.body);
            if(Object.keys(data).length !== 0){
                return res.status(200).send(data);
            }
            res.sendStatus(400);
        }catch(err){
            next(err);
        }
    },
    put: async(req,res,next)=> {
        try{
            const tagGenerated = cleanString.clean(req.body.text);
            req.body.tag = tagGenerated;
            await Option.updateOne({_id:req.params.option_id},req.body, { runValidators: true });
            res.sendStatus(201);
        }catch(err){
            next(err);
        }
    },
    putResult: async(req,res,next)=> {
        try{
            await Option.updateOne({_id:req.params.option_id}, {$inc : {'total_votes' : 1}} , { runValidators: true });
            res.sendStatus(201);
        }catch(err){
            next(err);
        }
    },
    delete: async(req,res,next)=> {
        try{
            await Option.deleteOne({_id:req.params.option_id});
            return res.sendStatus(204);
        }catch (err) {
            next(err);
        }
    }
});
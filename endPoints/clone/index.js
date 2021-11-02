module.exports = ({Functional,cleanString}) => ({

    get: async(req,res,next)=> {
        try {
            const data = await Functional.findOneAnSaveToClone(req.params);
            res.status(200).send(data);
        }catch(err){
            next(err);
        }
    },

});
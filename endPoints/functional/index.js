module.exports = ({ Functional: Functional, cleanString, cleanObject, converter }) => ({
    get: async (req, res, next) => {
        try {
            const data = await Functional.find({})
                .select('-content')
                .populate({ path: 'category_id', select: 'name' });
            const total = await Functional.countFindAll({});
            const response = {
                total: total,
                data: data,
            };
            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    },
    getById: async (req, res, next) => {
        try {
            const data = await Functional.findFunctionalById(req.params);
            res.status(200).send(data);
        } catch (err) {
            next(err);
        }
    },
    getFunctionalByUserId: async (req, res, next) => {
        try {
            const data = await Functional.find({user_id:req.params.user_id})
                .sort({
                    'created': req.params.order
                }).skip(Number(req.params.from))
                .limit(Number(req.params.quantity));
            const total = await Functional.countFindAll({});
            const response = {
                total: total,
                data:data
            };
            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    },
    getFunctionalByWordInQuestion: async (req, res, next) => {
        try {
            const data = await Functional.find(
                { 'content.tag': { '$regex': cleanString.clean(req.params.word), '$options': 'i' } },
            )
                .select('-content ')
                .sort({
                    'content.tag': req.params.order
                }).skip(Number(req.params.from))
                .limit(Number(req.params.quantity));
            const total = await Functional.countFindAll({});
            const response = {
                total: total,
                data:data
            };
            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    },
    getFunctionalByUserIdWordInQuestion: async (req, res, next) => {
        try {
            const data = await Functional.find(
                {user_id:req.params.user_id,'content.tag': { '$regex': cleanString.clean(req.params.word), '$options': 'i' }}
            )
                .select('-content')
                .sort({
                    'content.tag': req.params.order
                }).skip(Number(req.params.from))
                .limit(Number(req.params.quantity));
            const total = await Functional.countFindAll({});
            const response = {
                total: total,
                data:data
            };
            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    },

    getFunctionalByUserIdFilter: async (req, res, next) => {
        try {
            const data = await Functional.find(
                {
                    user_id:req.params.user_id,
                    category_id:req.params.filter_id
                }
            )
                .select('-content')
                .sort({
                    'created': req.params.order
                }).skip(Number(req.params.from))
                .limit(Number(req.params.quantity));
            const total = await Functional.countFindAll({});
            const response = {
                total: total,
                data:data
            };
            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    },

    getResults: async (req, res, next) => {
        try {
            const data = await Functional.findFunctionalResult(req.params);
            if (data) {
                const results = await converter.functionalResults(data);
                return res.status(200).send(results);
            }

            res.status(200).send({});
        } catch (err) {
            next(err);
        }
    },

    getFunctionalByCategory: async (req, res, next) => {
        try {
            const data = await Functional.findFunctionalByCategory(req.params);
            if (data) {
                const functionals = await converter.functionalByCategory(data);
                const response = {
                    total: await Functional.countFindAll({}),
                    data: functionals,
                };
                return res.status(200).send(response);
            }
            res.status(200).send({});
        } catch (err) {
            next(err);
        }
    },

    getFunctionalRandom: async (req, res, next) => {
        try {
            const data = await Functional.find(
                {
                    public: true,
                    enable: true,
                    category_id: req.params.category_id },
                '_id '
            )
                .sort({ created: -1 })
                .limit(Number(req.params.quantity));
            const convertedData = await converter.randomResponseImageSetting(data);

            res.status(200).send({ data: convertedData });
        } catch (err) {
            next(err);
        }
    },

    getFunctionalOrder: async (req, res, next) => {
        try {
            const data = await Functional.findFunctionalOrder(req.params);
            if (data) {
                const functionals = await converter.functionalByCategory(data);
                const response = {
                    total: await Functional.countFindAll({}),
                    data: functionals,
                };
                return res.status(200).send(response);
            }
            res.status(200).send({});
        } catch (err) {
            next(err);
        }
    },

    getFunctionalOrderLimit: async (req, res, next) => {
        try {
            const data = await Functional.findFunctionalOrderLimit(req.params);
            if (data) {
                const functionals = await converter.functionalByCategory(data);
                const response = {
                    total: await Functional.countFindAll({}),
                    data: functionals,
                };
                return res.status(200).send(response);
            }
            res.status(200).send({});
        } catch (err) {
            next(err);
        }
    },

    getComplete: async (req, res, next) => {
        try {
            const data = await Functional.find({})
                .select('-user_id -sharing')
                .populate({ path: 'category_id', select: 'name' })
                .populate({
                    path: 'content',
                    populate: { path: 'options', select: 'text' },
                });

            const newType = await converter.typeFunctional(data);

            const total = await Functional.countFindAll({});
            const response = {
                total: total,
                data: newType,
            };
            res.status(200).send(response);
        } catch (err) {
            next(err);
        }
    },

    post: async (req, res, next) => {
        try {
            if(req.body.content.length > 0){
                req.body.content[0].tag = cleanString.clean(req.body.content[0].question);
            }
            req.body.url = (req.body.url) ? cleanString.clean(req.body.url) : req.body.url;
            const data = await Functional.create(req.body);
            if (Object.keys(data).length !== 0) {
                return res.status(200).send(data);
            }
            res.sendStatus(400);
        } catch (err) {
            next(err);
        }
    },
    put: async (req, res, next) => {
        try {

            if(req.body.content.length > 0){
                req.body.content[0].tag = cleanString.clean(req.body.content[0].question);
            }
            req.body.url = (req.body.url) ? cleanString.clean(req.body.url) : req.body.url;
            const data = await Functional.findByIdAndUpdate(
                { _id: req.params.question_id },
                req.body,
                { runValidators: true, new: true, useFindAndModify: false }
            );
            res.status(201).send(data);
        } catch (err) {
            next(err);
        }
    },
    putPublic: async (req, res, next) => {
        try {
            await Functional.updateOne({ _id: req.params.question_id }, req.body);
            res.sendStatus(201);
        } catch (err) {
            next(err);
        }
    },
    putEnable: async (req, res, next) => {
        try {
            await Functional.updateOne({ _id: req.params.question_id }, req.body);
            res.sendStatus(201);
        } catch (err) {
            next(err);
        }
    },
    patchQuestionAdd: async (req, res, next) => {
        try {
            const data = await Functional.findByIdAndUpdate(
                { _id: req.params.question_id },
                { $push: { content: req.body } },
                { runValidators: true, new: true, useFindAndModify: false }
            );
            res.status(201).send(data);
        } catch (err) {
            next(err);
        }
    },
    patchQuestionUpdate: async (req, res, next) => {
        try {
            const toSetData = {
                'content': req.body.question,
            };
            const setPropertiesToUpdate = cleanObject.clean(toSetData);
            const data = await Functional.updateQuestionInFunctional(
                req.params.question_id,
                req.params.question_id,
                setPropertiesToUpdate
            );
            res.status(201).send(data);
        } catch (err) {
            next(err);
        }
    },
    patchOptionQuestionAdd: async (req, res, next) => {
        try {
            const data = await Functional.addOptionInQuestion(
                req.params.question_id,
                req.params.question_id,
                req.params.option_id,
                next
            );
            if (data.length > 0) {
                const dataFunctional = await Functional.findOneAndUpdate(
                    { _id: req.params.question_id },
                    data[0],
                    { runValidators: true, new: true, useFindAndModify: false }
                );
                return res.status(201).send(dataFunctional);
            }
            res.status(201).send({});
        } catch (err) {
            next(err);
        }
    },
});

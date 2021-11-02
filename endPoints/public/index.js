module.exports = ({ Functional, cleanString, cleanObject, converter }) => ({
    get: async (req, res, next) => {
        try {
            const data = await Functional.findOne({
                public: true,
                enable: true,
                url: req.params.url,
            })
                .select('-user_id')
                .populate({
                    path: 'content',
                    populate: {
                        path: 'options',
                        select:
                            'text total_votes order multimedia',
                    },
                });
            res.status(200).send(data);
        } catch (err) {
            next(err);
        }
    },
    getPreview:  async (req, res, next) => {
        try {
            const data = await Functional.findOne({
                url: req.params.url,
            })
                .select('-user_id')
                .populate({
                    path: 'content',
                    populate: {
                        path: 'options',
                        select:
                            'text total_votes order multimedia',
                    },
                });
            res.status(200).send(data);
        } catch (err) {
            next(err);
        }
    },
    
});

const { validate }  = require('./customValidation');

module.exports = ({Category,Option,Functional,body,validationResult,BadRequest,validationStrategy})=>({

    optionValidationRules: (actionHttp) => {
        return [
            body('text').isLength({ min: 1 }).withMessage('option-text-invalid'),
            body('text').custom( (data, { req }) => {
                const content = data;
                const text = content.replace(/<[^>]*>?/g, '');
                return new validate(text,true).maxLength({max:50}) .passed;
            }).withMessage('option-text-max-invalid'),

            body('multimedia').custom( (data, { req }) => {
                if(data){
                    return new validate(Object.keys(data),true).required().passed;
                }else{
                    return false;
                }
            }).withMessage('functional-multimedia-option-required'),
            validationStrategy.required.action(actionHttp,'multimedia.type','functional-multimedia-option-type-required',body),
            body('multimedia.type').isIn(['image','video','none']).withMessage('functional-multimedia-option-type-not-found'),
            body('multimedia.video').custom( (data, { req }) => {
                if(data){
                    return new validate(Object.keys(data),true).required().passed;
                }else{
                    return false;
                }
            }).withMessage('functional-multimedia-option-video-required'),
            body('multimedia.video.type').isIn(['rtve','youtube']).withMessage('functional-multimedia-option-video-not-found'),
            body('multimedia').custom( (data, { req }) => {
                if(data.type === 'video'){
                    return new validate(data.video.id,true).required().passed;
                }
                return true;
            }).withMessage('functional-multimedia-option-video-id-required'),

            body('multimedia.image').custom( (data, { req }) => {
                if(data){
                    return new validate(Object.keys(data),true).required().passed;
                }else{
                    return false;
                }
            }).withMessage('functional-multimedia-option-image-required'),
            body('multimedia').custom( (data, { req }) => {
                if(data.type === 'image'){
                    return new validate(data.image.path,true).required().passed;
                }
                return true;
            }).withMessage('functional-multimedia-option-image-path-required'),
        ];
    },


    functionalValidationRules: (actionHttp) => {
        return [
            validationStrategy.required.action(actionHttp,'url','url-required',body),
            body('url').isLength({ min: 10 }).withMessage('url-min-invalid'),
            body('url').isLength({ max: 120 }).withMessage('url-max-invalid'),
            body('url').custom( data => {
                const format = /[ !@#$%^&*()_+\=\[\]{};:\\|,.<>\/?~]/;
                return !format.test(data);
            }).withMessage('url-character-invalid'),

            body('url-share').custom( (data, { req }) => {
                if(data){
                    return new validate(Object.keys(data),true).required().passed;
                }else{
                    return false;
                }
            }).withMessage('functional-url-share-required'),
            body('url-share').custom( (data, { req }) => {
                return new validate(data.type,true).required().passed;
            }).withMessage('functional-url-share-type-required'),
            body('url-share').custom( (data, { req }) => {
                if(data.type === 'customUrl'){
                    return new validate(data.path,true).minLength({min:10}).passed;
                }
                return true;
            }).withMessage('functional-url-share-path-min'),
            body('url-share.type').isIn(['defaultUrl','customUrl']).withMessage('functional-url-share-type-not-found'),

            validationStrategy.unique.action(actionHttp,Functional,'url','functional-url-exists',body,'functional_id'),
            body('content.*.question').isLength({ min: 10 }).withMessage('question-min-invalid'),
            body('content.*.description').custom( (data, { req }) => {
                const content = data;
                const text = content.replace(/<[^>]*>?/g, '');
                return new validate(text,true).maxLength({max:300}) .passed;
            }).withMessage('description-max-invalid'),





            body('content.*.multimedia_question').custom( (data, { req }) => {
                if(data){
                    return new validate(Object.keys(data),true).required().passed;
                }else{
                    return false;
                }
            }).withMessage('functional-multimedia-question-required'),
            validationStrategy.required.action(actionHttp,'content.*.multimedia_question.type','functional-multimedia-question-type-required',body),
            body('content.*.multimedia_question.type').isIn(['image','video','none']).withMessage('functional-multimedia-question-type-not-found'),
            body('content.*.multimedia_question.video').custom( (data, { req }) => {
                if(data){
                    return new validate(Object.keys(data),true).required().passed;
                }else{
                    return false;
                }
            }).withMessage('functional-multimedia-question-video-required'),
            body('content.*.multimedia_question.video.type').isIn(['rtve','youtube']).withMessage('functional-multimedia-question-video-type-not-found'),
            body('content.*.multimedia_question').custom( (data, { req }) => {
                if(data.type === 'video'){
                    return new validate(data.video.id,true).required().passed;
                }
                return true;
            }).withMessage('functional-multimedia-question-video-id-required'),
            body('content.*.multimedia_question.image').custom( (data, { req }) => {
                if(data){
                    return new validate(Object.keys(data),true).required().passed;
                }else{
                    return false;
                }
            }).withMessage('functional-multimedia-question-image-required'),
            body('content.*.multimedia_question').custom( (data, { req }) => {
                if(data.type === 'image'){
                    return new validate(data.image.path,true).required().passed;
                }
                return true;
            }).withMessage('functional-multimedia-question-image-path-required'),
            body('content.*.multimedia_question.image.position').isIn(['top','background']).withMessage('functional-multimedia-question-image-position-not-found'),




            body('content.*.multimedia_answer').custom( (data, { req }) => {
                if(data){
                    return new validate(Object.keys(data),true).required().passed;
                }else{
                    return false;
                }
            }).withMessage('functional-multimedia-answer-required'),
            validationStrategy.required.action(actionHttp,'content.*.multimedia_answer.type','functional-multimedia-answer-type-required',body),
            body('content.*.multimedia_answer.type').isIn(['image','video','none']).withMessage('functional-multimedia-answer-type-not-found'),
            body('content.*.multimedia_answer.video').custom( (data, { req }) => {
                if(data){
                    return new validate(Object.keys(data),true).required().passed;
                }else{
                    return false;
                }
            }).withMessage('functional-multimedia-answer-video-required'),
            body('content.*.multimedia_answer.video.type').isIn(['rtve','youtube']).withMessage('functional-multimedia-answer-video-type-not-found'),
            body('content.*.multimedia_answer').custom( (data, { req }) => {
                if(data.type === 'video'){
                    return new validate(data.video.id,true).required().passed;
                }
                return true;
            }).withMessage('functional-multimedia-answer-video-id-required'),

            body('content.*.multimedia_answer.image').custom( (data, { req }) => {
                if(data){
                    return new validate(Object.keys(data),true).required().passed;
                }else{
                    return false;
                }
            }).withMessage('functional-multimedia-answer-image-required'),
            body('content.*.multimedia_answer').custom( (data, { req }) => {
                if(data.type === 'image'){
                    return new validate(data.image.path,true).required().passed;
                }
                return true;
            }).withMessage('functional-multimedia-answer-image-path-required'),
        ];
    },

    functionalQuestionValidationRules: (actionHttp) => {
        return [
            body('question').isLength({ min: 10 }).withMessage('question-min-invalid'),
            body('description').custom( (data, { req }) => {
                const content = data;
                const text = content.replace(/<[^>]*>?/g, '');
                return new validate(text,true).maxLength({max:1000}) .passed;
            }).withMessage('description-max-invalid')
        ];
    },

    categoryValidationRules: (actionHttp) => {
		 return [
		 	 body('name').isLength({ min: 2 }).withMessage('category-name-invalid')
		 ];
    },


    validate: (req, res, next) => {
        const err = validationResult(req);
        if (err.isEmpty()) {
            return next();
        }
        throw new BadRequest('Validation data',err.errors[0].msg);
    },
});
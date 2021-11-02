
const category = require('./category');

describe('Schema category', () => {
    it('should be defined the static method countFindAll', () => {
        expect(category.countFindAll).toBeDefined();
    });
});

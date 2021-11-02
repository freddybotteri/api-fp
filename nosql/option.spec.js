const option = require('./option');

describe('Schema functional', () => {
    it('should be defined the static method countFindAll', () => {
        expect(option.countFindAll).toBeDefined();
    });

    it('should be defined the static method totalCount', () => {
        expect(option.totalCount).toBeDefined();
    });

});
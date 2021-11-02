const { randomResponseImageSetting } = require('./converter');

describe('Converter ', () => {
    it('should return facebook image if multimedia path is empty', async() => {
        
        const dataTest = [
            {
                '_id': '5f8eecf8e319776e07bd4ba3',
            },
            {
                '_id': '5f8eecf8e319776e07bd4ba3',
            },
        ];
        
        const response = await randomResponseImageSetting(dataTest);

        expect(response[0].imageAlternativeNextFunctional).toEqual('resources/');
        expect(response[1].imageAlternativeNextFunctional).toEqual('');
    });
});
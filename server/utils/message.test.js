let expect = require('expect');
let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let from = 'admin';
        let text = 'the text';
        let message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({
            from,
            text
        });
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from="admin";
        let latitude = 15;
        let longitude = 19;
        let url = 'https://www.google.com/maps?q=15,19';
        let message = generateLocationMessage(from, latitude, longitude)

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({
            from,
            url
        });
    })  

})

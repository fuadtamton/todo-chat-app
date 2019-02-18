const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe("generateMessage", () => {

    it("Should generate correct message objects", () => {
        const from = 'fuad';
        const text = 'some texts';
        var message = generateMessage(from, text)
        expect(message).toInclude({ from, text })
        expect(message.createdAt).toBeA('number');

    })
})

describe("generateLocationMessage", () => {
    it("should generate correct location object", () => {
        const lat = 123
        const lon = 456
        const from = 'fuad'
        const message = generateLocationMessage(from, lat, lon)
        expect(message.from).toBe(from)
        expect(message.createdAt).toBeA('number')
        expect(message.url).toBe(`https://www.google.com/maps?q=123,456`)
    })
})
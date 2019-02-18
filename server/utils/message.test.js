const expect = require('expect');
const { generateMessage } = require('./message');

describe("generateMessage", () => {

    it("Should generate correct message objects", () => {
        const from = 'fuad';
        const text = 'some texts';
        var message = generateMessage(from, text)
        expect(message).toInclude({ from, text })
        expect(message.createdAt).toBeA('number');

    })
})
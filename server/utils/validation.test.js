const expect = require('expect');

const { isRealString } = require('./validation');

describe("iSRealString", () => {
    it("should reject if passing non string values", () => {
        let res = isRealString(000)
        expect(res).toBe(false)
    })
    it("should reject if passing only whitespaces", () => {
        let res = isRealString('      ')
        expect(res).toBe(false)
    })
    it("should accept if passing real string values", () => {
        let res = isRealString('fuad')
        expect(res).toBe(true)
    })
})
const expect = require('expect');
const { Users } = require('./users');

describe("Users", () => {
    it("should add a new user", () => {
        var users = new Users()
        var user = {
            id: "123456",
            name: "fuad",
            room: "react course"
        }
        users.addUser(user.id, user.name, user.room)
        expect(users.users).toEqual([user])
    })
})
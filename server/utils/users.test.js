const expect = require('expect');
const { Users } = require('./users');

var users;
describe("Users", () => {

    beforeEach(() => {
        users = new Users()
        users.users = [{
            id: 1,
            name: 'fuad',
            room: 'react'
        }, {
            id: 2,
            name: 'tamton',
            room: 'node'
        }, {
            id: 3,
            name: 'abc',
            room: 'react'
        }]
    })

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
    it("Should return names for node cource", () => {
        var res = users.getUserList('react');
        expect(res).toEqual(['fuad', 'abc']);
    })
    it("should remove a user", () => {
        var us = users.users[0]
        var id = us.id
        expect(users.users.length).toBe(3)
        var res = users.removeUser(id);
        expect(res).toEqual(us)
        expect(users.users.length).toBe(2)
    })
    it("should not remove a user", () => {
        var res = users.removeUser(5);
        expect(res).toNotExist()
        expect(users.users.length).toBe(3)
    })
    it("should find user", () => {
        var us = users.users[0]
        var id = us.id
        var res = users.getUser(id)
        expect(res).toEqual(us)
    })
    it("should not find user", () => {
        var res = users.getUser(12)
        expect(res).toNotExist()
    })
})
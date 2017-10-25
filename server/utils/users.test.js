const {Users} = require('./users');
const expect = require('expect');

describe('Users', () => {
    let users
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name:'mike',
                room: 'course'
            },
            {
                id: '2',
                name:'jen',
                room: 'node'
            },
            {
                id: '3',
                name:'jon',
                room: 'course'
            }
        ]
    });

    it('should create new user', () => {
        let chatUsers = new Users();
        let user = {
            id: '123456',
            name: 'Jonh',
            room: 'The room'
        }
        let newUser = chatUsers.addUser(user.id, user.name, user.room);
        expect(chatUsers.users).toEqual([user]);
    });

    it('should remove a user', () => {
        let userId = '1'
        let deleteUser = users.removeUser(userId);
        
        expect(deleteUser.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        let userId = '44';
        let deleteUser = users.removeUser(userId);

        expect(deleteUser).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find a user', () => {
        let userId = '2';
        let user = users.getUser(userId);

        expect(user.id).toBe(userId)
    });

    it('should not find a user', () => {
        let userId = '5';
        let user = users.getUser(userId);

        expect(user).toBeFalsy();
    })

    it('should return name for node', () => {
        let userList = users.getUserList('node');
        expect(userList).toEqual(['jen'])
    });

    it('should return name for course', () => {
        let userList = users.getUserList('course');
        expect(userList).toEqual(['mike', 'jon'])
    })
});
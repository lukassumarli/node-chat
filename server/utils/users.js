class Users {
    constructor() {
        this.users = []
    }

    addUser(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        let user = this.getUser(id);

        if(user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        let users = this.users.filter((user) => {
            return user.room === room
        })
        .map((user) => {
            return user.name
        });

        return users;

    
    }
}

module.exports = {Users}
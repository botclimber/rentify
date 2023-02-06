const Database = require('../../../Database/Db.js')

module.exports = class User extends Database {
    Id;
    constructor(username, passsword) {
        super()
        this.Username = username
        this.Password = passsword
    }
}
const db = require('../db-connection')

module.exports = {
    createUser : function(username, email){
        db.connect(function(err) {
            db.query(`INSERT INTO qgparce.users (username, email) VALUES ('${username}', '${email}')`, 
            function(err, result, fields) {
                if (err) return err
            })
        })
    },
    getAllUsers : function(){
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM qgparce.users`, function(err, result, fields) {
                if(err) return err
                resolve(result) 
            })
        })
    },
    deleteUser: function(email){
        db.connect(function(err) {
            db.query(`DELETE FROM qgparce.users WHERE email="${email}"`, function(err, result, fields) {
                if(err) return err
            })
        })
    },
    updateUser: function(data){
        let {username, email} = data
        db.connect(function(err) {
            db.query(`UPDATE qgparce.users SET username="${username}" WHERE email="${email}"`, function(err, result, fields) {
                if(err) return err
            })
        })
    }
}
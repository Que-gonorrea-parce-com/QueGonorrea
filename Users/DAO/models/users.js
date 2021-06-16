const db = require('../db-connection')
const bcrypt = require('bcrypt')

module.exports = {
    createUser : function(body){
        let {username, email, password} = body
        let hashpassword = bcrypt.hashSync(password, 10)
        db.connect(function(err) {
            db.query(`INSERT INTO qgparce.users (username, email, password) VALUES ('${username}', '${email}', '${hashpassword}')`, function(err, result, fields) {
                if (err) return err
            })
        })
    },
    userLogin: function(body){
        let {email, password} = body
        return new Promise(function(resolve, reject) {
            db.query(`SELECT * FROM qgparce.users WHERE email="${email}"`, function(err, result, fields) {
                if (err) return err
                resolve((result.length !== 0 && bcrypt.compareSync(password, result[0].password)) ? email : null)
            })
        })  
    },
    getAllUsers : function(){
        //TODO: excluir el campo password
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
    updateUser: function(body){
        let {username, email} = body
        db.connect(function(err) {
            db.query(`UPDATE qgparce.users SET username="${username}" WHERE email="${email}"`, function(err, result, fields) {
                if(err) return err
            })
        })
    }
}
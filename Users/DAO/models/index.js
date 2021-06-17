const db = require('../db-connection')

module.exports = {
    createDatabase : function(){
        db.query('CREATE DATABASE IF NOT EXISTS qgparce;')
        db.query('USE qgparce;')
        //Tabla de Usuarios
        db.query('CREATE TABLE IF NOT EXISTS users(username varchar(255), email varchar(255), password varchar(255), following varchar(2048), followers varchar(2048), PRIMARY KEY(username));', function(error, result, fields) {
           if(error) console.log(error)
           console.log(result)
        })
        //Tabla de Historias
        db.query('CREATE TABLE IF NOT EXISTS historias(id int NOT NULL AUTO_INCREMENT, body varchar(510), reaction varchar(64), user_username varchar(255), PRIMARY KEY (id), FOREIGN KEY (user_username) REFERENCES users(username))', function(error, result, fields) {
           if(error) console.log(error)
           console.log(result)
       })
    
    },
    deleteDatabase : function(){
        db.query('USE qgparce;')
        db.query('DROP TABLE historias', function(error, result, fields) {
            if(error) console.log(error)
            console.log(result)
        })
        db.query('DROP TABLE users', function(error, result, fields) {
            if(error) console.log(error)
            console.log(result)
        })
    }
}
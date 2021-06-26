const db = require('../db-connection')

module.exports = {
    createDatabase : function() {
        try {
            db.query('CREATE DATABASE IF NOT EXISTS qgparce;')
            db.query('USE qgparce;')
            //Tabla de Usuarios
            db.query('CREATE TABLE IF NOT EXISTS users(username varchar(255), email varchar(255), password varchar(255), following varchar(2048), followers varchar(2048), PRIMARY KEY(username));', function(error, result, fields) {
                if(error) console.log(error)
                console.log(result)
            })
            //Tabla de Historias
            db.query('CREATE TABLE IF NOT EXISTS historias(id int NOT NULL AUTO_INCREMENT, body varchar(510), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP , user_username varchar(255), PRIMARY KEY (id), FOREIGN KEY (user_username) REFERENCES users(username))', function(error, result, fields) {
                if(error) console.log(error)
                console.log(result)
            })
            //Tabla comentarios
            db.query('CREATE TABLE IF NOT EXISTS comentarios(id int NOT NULL AUTO_INCREMENT, body varchar(510), history_id int, PRIMARY KEY (id), FOREIGN KEY (history_id) REFERENCES historias(id))', function(error, result, fields) {
                if(error) console.log(error)
                console.log(result)
            })
            db.query('CREATE TABLE IF NOT EXISTS reacciones(id int NOT NULL AUTO_INCREMENT, no_pues_morite int, mera_vuelta int, ah_bueno_pa_saber int, a_lo_bien int, se_estan_es_pasando int, que_gonorrea_parce int, history_id int, PRIMARY KEY (id), FOREIGN KEY (history_id) REFERENCES historias(id))', function(error, result, fields) {
                if(error) console.log(error)
                console.log(result) 
            })
        } catch (error) {
            console.log("Error creating database: ", error)
        }
        return 0
    },
    deleteDatabase : function(){
        try {
            db.query('USE qgparce;')
            db.query('DROP TABLE reacciones', function(error, result, fields) {
                if(error) console.log(error)
            })
            db.query('DROP TABLE comentarios', function(error, result, fields) {
                if(error) console.log(error)
            })
            db.query('DROP TABLE historias', function(error, result, fields) {
                if(error) console.log(error)
            })
            db.query('DROP TABLE users', function(error, result, fields) {
                if(error) console.log(error)
            })
        } catch (error){
            console.log("Error deletig database: ", error)
        }
        return 0
    }
}
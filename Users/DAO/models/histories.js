const db = require('../db-connection')

module.exports = {
    createHistory : function(data){
        return new Promise(function(resolve, reject) {
            const {body, reaction, user_username} = data
            db.connect(function(err) {
                db.query(`INSERT INTO qgparce.historias (body, reaction, user_username) VALUES ('${body}', '${reaction}', '${user_username}')`, 
                function(err, result, fields) {
                    if (err) return err
                    resolve(result)
                })
            })
        })
    },
    getAllHistories : function(username){
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM qgparce.historias WHERE user_username="${username}"`, function(err, result,fields) {
                if(err) return err
                resolve(result) 
            })
        })
    },
    getAllHistoriesByReaction : function(username, reaction) {
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM qgparce.historias WHERE user_username="${username}" AND reaction="${reaction}"`, function(err, result,fields) {
                if(err) return err
                resolve(result) 
            })
        })
    },
    getOneHistory : function(id){
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM qgparce.historias WHERE id="${id}"`, function(err, result, fields) {
                if(err) return err
                resolve(result) 
            })
        })
    },
}
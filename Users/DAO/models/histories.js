const db = require('../db-connection')

module.exports = {
    createHistory : function(data){
        const {body, reaction, user_username} = data
        db.connect(function(err) {
            db.query(`INSERT INTO qgparce.historias (body, reaction, user_username) VALUES ('${body}', '${reaction}', '${user_username}')`, 
            function(err, result, fields) {
                if (err) return err
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
}
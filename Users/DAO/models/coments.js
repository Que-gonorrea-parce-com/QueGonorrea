const db = require('../db-connection')
const historias = require('./histories')

module.exports = {
    createComment : async function(data) {
        const {id, comment} = data
        let historia = await historias.getOneHistory(id)
        if(historia.length === 0) return -1
        db.query(`INSERT INTO qgparce.comentarios (body, history_id) VALUES ('${comment}', ${id})`, 
        function(err, result, fields) {
            if (err) return err
        })
        return 0
    },
    getAllComments : function(id){
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM qgparce.comentarios WHERE history_id=${id}`, function(err, result,fields) {
                if(err) return err
                resolve(result) 
            })
        })
    },
}
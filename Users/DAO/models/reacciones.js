const db = require('../db-connection')
const historias = require('./histories')

module.exports = {
    agregarReaccion : async function(data) {
        const {id, reaccion, cantidad} = data
        let historia = await historias.getOneHistory(id)
        if(historia.length === 0) return -1
        db.query(`INSERT INTO qgparce.reacciones (${reaccion}, history_id) VALUES (${cantidad}, ${id})`, 
        function(err, result, fields) {
            if (err) return err
        })
        return 0
    },
    obtenerReaccionesDe1Historia : function(id){
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM qgparce.reacciones WHERE history_id=${id}`, function(err, result,fields) {
                if(err) return err
                resolve(result) 
            })
        })
    },
}
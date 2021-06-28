const db = require('../db-connection')

module.exports = {
    createReaction: function (id) {
        db.query(`INSERT INTO qgparce.reacciones (no_pues_morite, mera_vuelta, ah_bueno_pa_saber, a_lo_bien, se_estan_es_pasando, que_gonorrea_parce, history_id) VALUES (0,0,0,0,0,0, ${id})`, 
        function(err, result, fields) {
            if (err) return -1
        })
        return 0
    },
    agregarReaccion : async function(data, cantidad) {
        const {history_id, reaccion} = data
        db.query(`UPDATE qgparce.reacciones SET ${reaccion}=${cantidad} WHERE history_id=${history_id}`, function(err, result, fields) {
            if(err) return err
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
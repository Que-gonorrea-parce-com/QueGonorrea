const mysql = require('mysql')

const db = mysql.createConnection({
    host: '',
    user: '',
    password: '',
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!"); 
      
});

module.exports = db

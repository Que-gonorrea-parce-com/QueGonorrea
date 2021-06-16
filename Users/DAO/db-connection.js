const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'qgp-cluster-instance-1.cv9vfs7oprmu.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'nimda123',
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!"); 
      
});

module.exports = db

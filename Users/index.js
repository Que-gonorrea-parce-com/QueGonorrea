const express = require('express')
const bodyParser= require('body-parser')

const initDB = require('./DAO/models/index')
const users = require('./DAO/models/users')
const historias = require('./DAO/models/histories')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/createDatabase", () => {
    initDB.createDatabase()
})

app.get("/deleteDatabase", () => {
    initDB.deleteDatabase()
})  

//Users START
app.post('/users', (req, res) => {
    if (req.body.username && req.body.email) {
        users.createUser(req.body.username, req.body.email)
        res.send({username: req.body.username, email: req.body.email})
    } else {
        console.log('Missing a parameter')
    }
})

app.get('/users', async (req, res) => {
    usersArray = await users.getAllUsers()
    res.send(usersArray)
})

app.delete('/users', async (req, res) => {
    users.deleteUser(req.body.email)
    res.send("User has been deleted succesfully")
})

app.patch('/users', async (req, res) => {
    users.updateUser(req.body)
    res.send("User updated succesfully")
})
//Users END


//Historias START
app.post('/histories', (req, res) => {
    if (req.body.body && req.body.reaction && req.body.user_username) {
        historias.createHistory(req.body)
        res.send({body: req.body.body, reaction: req.body.reaction})
    } else {
        console.log('Missing a parameter')
    }
})

app.get('/histories', async (req, res) => {
    console.log(req.query.username)
    usersArray = await historias.getAllHistories(req.query.username)
    res.send(usersArray)
})
//Historias END

app.listen(3000, () => {
    console.log("Server running on port 3000")
})

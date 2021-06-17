const express = require('express')
const bodyParser= require('body-parser')

const initDB = require('./DAO/models/index')
const users = require('./DAO/models/users')
const historias = require('./DAO/models/histories')
const session = require('express-session')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
    secret: 'QGnoParc',
    resave: false,
    saveUninitialized: true
}))

app.get("/createDatabase", () => {
    initDB.createDatabase()
})

app.get("/deleteDatabase", () => {
    initDB.deleteDatabase()
})  

//Users START
app.post('/users', (req, res) => {
    users.createUser(req.body)
    res.send({username: req.body.username, email: req.body.email})
})

app.put('/follow', async (req, res) => {
    response = users.followUser(req.body.user, req.body.follow)
    res.send("all gucci")
})

app.put('/unfollow', async (req, res) => {
    response = users.unfollowUser(req.body.user, req.body.follow)
    res.send("all gucci")
})

app.post('/login', async (req, res) => {
    let email = await users.userLogin(req.body)
    console.log(email)
    if (email){
        req.session.email = email
        res.send({login: true})
    } else {
        res.send({login: false})
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

const express = require('express')
const bodyParser= require('body-parser')

const initDB = require('./DAO/models/index')
const users = require('./DAO/models/users')
const historias = require('./DAO/models/histories')
const comentarios = require('./DAO/models/coments')

const session = require('express-session')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
    secret: 'QGnoParc',
    resave: false,
    saveUninitialized: true
}))

app.get("/createDatabase", (req, res) => {
    initDB.createDatabase()
    res.json("Database created")
})

app.get("/deleteDatabase", (req, res) => {
    initDB.deleteDatabase()
    res.json("Database deleted")
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
app.post('/histories', async (req, res) => {
    if (req.body.body && req.body.reaction && req.body.user_username) {
        let createdHistory = await historias.createHistory(req.body)
        console.log(createdHistory)
        res.send({body: req.body.body, reaction: req.body.reaction})
    } else {
        console.log('Missing a parameter')
    }
})

app.get('/histories', async (req, res) => {
    let usersArray = await historias.getAllHistories(req.query.username)
    res.send(usersArray)
})
//Historias END


//Comentarios START
app.post('/comentario', async (req, res) => {
    if (req.body.id && req.body.comment) {
        let comment = await comentarios.createComment(req.body)
        if(comment == -1) res.send({"error": "History id not found"})
        res.send({body: req.body.comment})
    }
})

app.get('/comentario', async (req, res) => {
    console.log(req.query.historyId)
    let commentsArray = await comentarios.getAllComments(req.query.historyId)
    res.send(commentsArray)
})

//Comentarios END


app.listen(3000, () => {
    console.log("Server running on port 3000")
})

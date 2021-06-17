const db = require('../db-connection')
const bcrypt = require('bcrypt')

module.exports = {
    createUser : function(body){
        let {username, email, password} = body
        let hashpassword = bcrypt.hashSync(password, 10)
        db.connect(function(err) {
            db.query(`INSERT INTO qgparce.users (username, email, password) VALUES ('${username}', '${email}', '${hashpassword}')`, function(err, result, fields) {
                if (err) return err
            })
        })
    },
    userLogin: function(body){
        let {email, password} = body
        return new Promise(function(resolve, reject) {
            db.query(`SELECT * FROM qgparce.users WHERE email="${email}"`, function(err, result, fields) {
                if (err) return err
                resolve((result.length !== 0 && bcrypt.compareSync(password, result[0].password)) ? email : null)
            })
        })  
    },
    getAllUsers : function(){
        //TODO: excluir el campo password
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM qgparce.users`, function(err, result, fields) {
                if(err) return err
                resolve(result) 
            })
        })
    },
    deleteUser: function(email){
        db.connect(function(err) {
            db.query(`DELETE FROM qgparce.users WHERE email="${email}"`, function(err, result, fields) {
                if(err) return err
            })
        })
    },
    updateUser: function(body){
        let {username, email} = body
        db.connect(function(err) {
            db.query(`UPDATE qgparce.users SET username="${username}" WHERE email="${email}"`, function(err, result, fields) {
                if(err) return err
            })
        })
    },
    followUser: async function(user, follow) {
        let currentUser = new Promise(function(resolve, reject){
            db.query(`SELECT * FROM qgparce.users WHERE username="${user}"`, function(err, result, fields) {
                if(err) return err
                resolve(result)
            })
        })
        let userToFollow = new Promise(function(resolve, reject){
            db.query(`SELECT * FROM qgparce.users WHERE username="${follow}"`, function(err, result, fields) {
                if(err) return err
                resolve(result)
            })
        })
        let followingData = await currentUser
        let followerData = await userToFollow
        let newFollowingData
        let newFollowerData

        if (followingData[0].following == null){
            newFollowingData = `${follow},`
        } else {
            newFollowingData = followingData[0].following + `${follow},`
        }

        if (followerData[0].followers == null){
            newFollowerData = `${user},`
        } else {
            newFollowerData = followerData[0].followers + `${user},`
        }
        db.connect(function(err) {
            db.query(`UPDATE qgparce.users SET following="${newFollowingData}" WHERE username="${user}"`, function(err, result, fields) {
                if(err) return err
            })
        })
        db.connect(function(err) {
            db.query(`UPDATE qgparce.users SET followers="${newFollowerData}" WHERE username="${follow}"`, function(err, result, fields) {
                if(err) return err
            })
        })
    },
    unfollowUser: async function(user, follow) {
        let currentUser = new Promise(function(resolve, reject){
            db.query(`SELECT * FROM qgparce.users WHERE username="${user}"`, function(err, result, fields) {
                if(err) return err
                resolve(result)
            })
        })
        let userToUnfollow = new Promise(function(resolve, reject){
            db.query(`SELECT * FROM qgparce.users WHERE username="${follow}"`, function(err, result, fields) {
                if(err) return err
                resolve(result)
            })
        })
        let currentUserData = await currentUser
        let userToUnfollowData  = await userToUnfollow
        let newFollowingData
        let newFollowerData

        if (currentUserData[0].following != null){
            let followingArray = currentUserData[0].following.slice(0, -1).split(",")
            let removeIndexFollowing = followingArray.indexOf(follow)
            followingArray.splice(removeIndexFollowing,1)
            followingArray = followingArray.map(i => i + ",");
            newFollowingData = followingArray.join(",")
        } else {
            throw "User is not following anyone"
        }

        if (userToUnfollowData[0].followers != null){
            let followersArray = userToUnfollowData[0].followers.slice(0, -1).split(",")
            let removeIndexFollower = followersArray.indexOf(user)
            followersArray.splice(removeIndexFollower,1)
            followersArray = followersArray.map(i => i + ",");
            newFollowerData = followersArray.join(",")
        } else {
            throw "User is not being followed anyone"
        }

        db.connect(function(err) {
            db.query(`UPDATE qgparce.users SET following="${newFollowingData}" WHERE username="${user}"`, function(err, result, fields) {
                if(err) return err
            })
        })
        db.connect(function(err) {
            db.query(`UPDATE qgparce.users SET followers="${newFollowerData}" WHERE username="${follow}"`, function(err, result, fields) {
                if(err) return err
            })
        })
    }
}
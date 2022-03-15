const {User} = require('../model/User');

async function allUsers (req, res) {
    try {
        const users = await User.all;
        res.json(users);
      } catch (err) {
        res.status(500).json(err);
      }
}

const createUser = async (req , res ) => {
    try {
        const {username, points, game_id} = req.body
        const user = User.createUser(username, points, game_id)
        res.status(201).res.json(user)    
    } catch (err){
        res.status(404).res.json(err)

    }
}

const getUpdatedPoints = async (req , res ) => {
    try {
        const {user_id, points} = req.body
        const userUpdate = User.updatePoints(user_id,points)
        res.status(201).res.json(userUpdate)    
    } catch (err){
        res.status(500).res.json(err)

    }
}

const getUsersByGame= async (req , res ) => {
    try {
        const {game_id} = req.body
        const users = User.findByGame(game_id)
        res.status(201).res.json(users)
    } catch (err){
        res.status(500).res.json(err)

    }
}

const getPointsTable= async (req , res ) => {
    try {
        const {game_id} = req.body
        const users = User.pointsTable(game_id)
        res.status(201).res.json(users)
    } catch (err){
        res.status(500).res.json(err)

    }
}








module.exports = { allUsers, createUser, getUpdatedPoints, getUsersByGame, getPointsTable}

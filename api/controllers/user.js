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
        const user = await User.createUser(username, points, game_id)
        console.log(user)
        res.status(201).json(user)    
    } catch (err){
        res.status(404).send(err)

    }
}

const updateUserPoints = async (req , res ) => {
    try {
        const {user_id} = req.params
        const {points} = req.body
        const userUpdate = await User.updatePoints(user_id,points)
        res.status(201).json(userUpdate)    
    } catch (err){
        res.status(500).send(err)

    }
}

const getUsersByGame= async (req , res ) => {
    try {
        const id = req.params.game_id
        const users = await User.findByGame(id)
        res.status(201).json(users)
    } catch (err){
        res.status(500).send(err)

    }
}

const getPointsTable= async (req , res ) => {
    try {
        const game_id = req.params.id
        console.log(game_id)
        const users = await User.pointsTable(game_id)
        res.status(201).json(users)
    } catch (err){
        res.status(500).send(err)

    }
}








module.exports = { allUsers, createUser, updateUserPoints, getUsersByGame, getPointsTable}

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')

router.get('/', userController.allUsers)
router.post('/',userController.createUser)
router.get('/game/table/:id', userController.getPointsTable)
router.patch('/points/:user_id', userController.updateUserPoints)
router.get('/game/:game_id', userController.getUsersByGame)


module.exports = router;


const express = require('express')
const router = express.Router()

const {startGame} = require('../controllers/game');

router.post('/startgame', startGame)

module.exports= router
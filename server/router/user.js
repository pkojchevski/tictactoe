const express = require('express')
const router = express.Router()

const {checkIfUsernameIsUnique, saveUsername, login} = require('../controllers/user');

router.post('/checkUsername', checkIfUsernameIsUnique)
router.post('/saveUsername', saveUsername)
router.post('/login', login)

module.exports = router;
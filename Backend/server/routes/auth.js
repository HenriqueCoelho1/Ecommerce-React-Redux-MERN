const express = require('express')

const router = express.Router()

const {createOrUpdateUser} = require('../controllers/auth')

//route
router.get('/create-or-update-user', createOrUpdateUser)


module.exports = router
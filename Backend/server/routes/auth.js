const express = require('express')

const router = express.Router()

//middlewares
const {authCheck} = require('../middlewares/auth')

//controler
const {createOrUpdateUser} = require('../controllers/auth')

// const myMiddleware = (req, res, next) => {
//     console.log("I'M THE MIDDLEWARE WAY")
//     next()
// }

//route
router.post('/create-or-update-user', authCheck, createOrUpdateUser)

// router.get('/testing', myMiddleware, (req, res) => {
//     res.json({
//         data: "YOU SUCCESSFULLY TRIED MIDDLEWARE"
//     })
// })

module.exports = router
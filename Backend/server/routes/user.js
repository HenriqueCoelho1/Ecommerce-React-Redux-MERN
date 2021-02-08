const express = require('express')

const router = express.Router()

//route
router.get('/user', (req, res) => {
    res.json({
        data: 'Hey you hit the user endpoint'
    })
})


module.exports = router
const express = require('express')

const router = express.Router()

//route
router.get('/create-or-update-user', (req, res) => {
    res.json({
        data: 'Hey you hit the create-or-update-user endpoint'
    })
})


module.exports = router
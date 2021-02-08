const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
require('dotenv').config()

//import


//APP
const app = express() 

//DB CONNECTION DATABASE WITH MONGOOSE
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,//due the error
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
.then(() => console.log('DB CONNECTED'))
.catch((err) => console.log(`DB CONNECTION ERR ${err}`))

//MIDDLEWARES
app.use(morgan("dev"))
app.use(bodyParser.json({limit: "2mb"}))
app.use(cors())

//routes middlewares
// app.use('/api', authRotes)
fs.readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r )))



//PORT
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`SERVER IS RUNNING ON PORT ${port} `))
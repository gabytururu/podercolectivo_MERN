const express = require('express');
require('dotenv').config()
const QuejasRoutes = require('./routes/quejasRoutes')


//======express app======//
const app = express()

//======middleware======//
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})
app.use(express.json())

app.use('/api/quejas/', QuejasRoutes)

//=====DB Connection======//


//====Listen to Client====//
app.listen(process.env.PORT,()=>{
    console.log('listening on selected port', process.env.PORT)
})

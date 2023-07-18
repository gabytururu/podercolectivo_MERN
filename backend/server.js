const express = require('express');
require('dotenv').config()
const QuejasRoutes = require('./routes/quejasRoutes')
const mongoose = require('mongoose')
const cors = require('cors')

//======express app======//
const app = express()
app.use(cors())

//======middleware======//
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})
app.use(express.json())

app.use('/api/quejas/', QuejasRoutes)

//=====DB Connection======//
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log('listening to port:', process.env.PORT)
        })
    })
    .catch((err)=>{
        console.log('Error de Conexion a la DB y App:', err)
    })

//====Listen to Client====//
// app.listen(process.env.PORT,()=>{
//     console.log('listening on selected port', process.env.PORT)
// })

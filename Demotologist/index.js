const express = require('express');
const router = require('./route/user_routes')
const mongoose = require('./config/databased')
const app = express();

mongoose.connect()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/user',router)




app.listen(process.env.PORT,()=>{
    console.log(`server is running ${process.env.PORT}`)
})
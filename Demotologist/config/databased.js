const mongoose = require('mongoose')
require('dotenv').config()

exports.connect = () => {
    mongoose.connect(process.env.URL)
    const db = mongoose.connection
    db.on('error', () => {
        console.log('databased connection error')
    })
    db.once('open', () => {
        console.log('databased is connected')
    })
}

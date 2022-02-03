const bcrypt = require('bcrypt')
const User = require('../models/usermodel')
const { reg_valid, login_valid } = require('../auth/valid')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')
require('dotenv').config()


exports.registerUser = async (req, res) => {
    try {
        // checking data validation
        const { error } = reg_valid(req.body)
        if (error) {
            return res.json(error.details[0].message)
        }

        //checking duplicate email not save in databased
        const userdata = await User.findOne({ email: req.body.email })
        if (userdata) {
            return res.json('email already exist')
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        //new data model create
        const newdata = new User
            ({
                username: req.body.username,
                email: req.body.email,
                role:req.body.role,
                password: hashPassword
            })


        try {
            //save to database
            const result = newdata.save()
            res.send(newdata)
        } catch (error) {
            res.send(error)
        }

    } catch (error) {
        res.send(error)
    }

}



exports.loginUser =async (req, res) => {
    try {
        try {
            //checking valid data form client 
            const {error} = login_valid(req.body)
            if(error){
                return res.json(error.details[0].message)
            }

            //checking email available in database or not
            const exitEmail = await User.findOne({email:req.body.email})
            if(!exitEmail){
                return res.json('email not exist please login')
            }

            //compare hash password
            const validpassword = await bcrypt.compare(req.body.password,exitEmail.password)
            if(!validpassword){
                return res.json('password is incorrect')
            }

            const payload = {id:exitEmail._id,role:exitEmail.role}
   
            const secret = process.env.SECRET
    
            const options={expiresIn:process.env.EXPIRE}
            //new token generate
            const token = jwt.sign(payload,secret,options)

            //ref token genreate
            const ref_secret = process.env.REF_SECRET

            const refToken = jwt.sign(payload,ref_secret)

            res.json({
                data:exitEmail,
                newtoken:token,
                refToken:refToken
            })

        } catch (error) {
            res.send(error)
        }
    } catch (error) {
        res.send(error)
    }
}




exports.admin = (req,res)=>{
    const {role} = req.user
    if(role == 'admin'){
        const data = req.body
        return res.send('admin')
    }
    
    res.json({
        data:data
    })
}

exports.dashboard = (req, res) => {
    res.send('dashboard')
}


// exports.logout = async(req,res,next)=>{
//     const {parmentToken} = req.body
//     refreshToken=refreshToken.filter(token=>token!=parmentToken)
//     res.json({
//         msg:'logout'
//     })
// }
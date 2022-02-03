const express = require("express");
const {registerUser,loginUser,dashboard,admin,logout} = require('../controller/user_controller')
const {auth} = require('../auth/jwt_auth')
const router = express.Router()

router.post('/signup',registerUser)
router.post('/login',loginUser)
router.get('/dashboard',auth,dashboard)

router.get('/admin',auth,admin)
// router.post('/admin',auth,admin)
// router.post('/logout',logout)

module.exports= router
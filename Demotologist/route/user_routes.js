const router = require("express").Router();
const {registerUser,loginUser,dashboard} = require('../controller/user_controller')
const {auth} = require('../auth/jwt_auth')

router.post('/signup',registerUser)
router.post('/login',loginUser)
router.get('/dashboard',auth,dashboard)

module.exports= router
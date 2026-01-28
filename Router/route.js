const express = require("express");
const { registerUser, loginUser ,changePassword } = require('../Controller/Auth-controller');
const authMiddleWare=require("../middleWare/auth-middleware")

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/password",authMiddleWare,changePassword)
module.exports = router;
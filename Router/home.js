const express = require('express');
const authMiddleWare=require('../middleWare/auth-middleware')
const router = express.Router();


router.get("/home", authMiddleWare, (req, res) => {
    const {userId,userName,role}=req.userInfo
    res.status(200).json({
        message: "Welcome to the Home Page:",
        data: {
            userId,userName,role
        }
    })
    // userName
});

module.exports = router;
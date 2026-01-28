const express = require('express');
const authMiddleWare=require('../middleWare/auth-middleware')
const route = express.Router();
const adminmiddleWare=require('../middleWare/admin-middleware')

route.get('/admin',authMiddleWare ,adminmiddleWare,(req, res) => {
    res.status(202).json({message:"Welcome to Admin Page"})
});

module.exports = route;
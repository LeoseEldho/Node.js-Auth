const {uploadImage,fetchImage,deleteImage} = require("../Controller/image-controller");
const express = require("express");
const adminMiddleware = require("../middleWare/admin-middleware");
const authMiddleware = require("../middleWare/auth-middleware");
const uploadImageMiddleWare=require("../middleWare/uploadImage-middleWare")
// const fetchImage=require('../Controller/image-controller')

const route = express.Router();

route.post(
  "/imageRoute",
  authMiddleware,
  adminMiddleware,
  uploadImageMiddleWare.single("image"),
  uploadImage,
);

route.delete("/:id",authMiddleware,adminMiddleware,deleteImage)

route.get('/all',authMiddleware,fetchImage)

module.exports = route;

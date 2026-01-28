const jwt=require("jsonwebtoken")

const authMiddleWare = (req, res, next) => {
     const authHeader=req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
       return res.status(404).json({message:"Not Loggined"})
    }
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_KEY);
        req.userInfo = decodeToken;

         next()
    } catch (err) {
       return console.log(err)
    }
};
module.exports = authMiddleWare;
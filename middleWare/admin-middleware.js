const adminmiddleWare = (req, res, next) => {
    if (req.userInfo.role !== "Admin") {
        return res.status(202).json({ message: "admin only allowed" })
    }
    next()
};
module.exports = adminmiddleWare;
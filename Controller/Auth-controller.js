const User = require("../modules/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    const userExist = await User.findOne({ $or: [{ userName }, { email }] });
    if (userExist) {
      return res.status(400).json({
        message: "This username or email has been taken,Try another..",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newCreatedUser = await User.create({
      userName,
      email,
      password: hash,
      role: role || "User",
    });
    if (newCreatedUser) {
      res
        .status(200)
        .json({ message: "Registered New User", data: newCreatedUser });
    } else {
      res.status(404).json({ message: "Unable to Register" });
    }
  } catch (error) {
    console.log("Something Occure error!", error);
  }
};
const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "Register first !." });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        username: user.userName,
        role: user.role,
      },
      process.env.JWT_KEY,
      { expiresIn: "15m" },
    );

    res.status(200).json({ message: "Loggin Successfully", accessToken });
  } catch (error) {
    console.log("Something Occure error!", error);
  }
};

const changePassword = async (req, res) => {
  try {
    const userid = req.userInfo.userId;
  const { oldpassward, newPassword } = req.body;
  const user=await User.findById(userid)
  if (!user) {
    res.status(404).json({message:"There is no user"})
  };
  const isPasswordMatch = await bcrypt.compare(oldpassward, user.password);
  if (!isPasswordMatch) {
    res.status(404).json({message:"Old password is wrong!!!"})
  }
  const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt)
     user.password = hashPassword;
  await user.save()
    
 
  res.status(200).json({message:"Password changed successfully"})
  } catch (err) {
    clg(err)
  }
}
module.exports = { registerUser, loginUser ,changePassword};

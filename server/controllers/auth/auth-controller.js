const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");



// register

const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.json({
                success: false,
                message: "User already exists with same email! Please try with different email",
            });
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password: hashPassword
        });

        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Registration successfull",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: "User cannot be created",
        });
    }
}

// login

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.json({
                success: false,
                message: "User does not exist with this email! Please register",
            });
        }
        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkPasswordMatch) {
            return res.json({
                success: false,
                message: "Incorrect Password",
            });
        }
        const token = jwt.sign({ email: checkUser.email, id: checkUser._id, role: checkUser.role, userName: checkUser.userName }, 'CLIENT_SECRET_KEY', {
            expiresIn: "2h",
        });

        res.cookie("token", token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: checkUser._id,
                email: checkUser.email,
                role: checkUser.role,
                userName: checkUser.userName
            },

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: "User cannot be created",
        });
    }
}


// logout
const logoutUser = (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: "User logged out successfully",
    });
};

//auth miiddleware
const authMiddleware = async (req, res, next) => {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized user!",
        });
    }
    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized user!",
        });
    }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
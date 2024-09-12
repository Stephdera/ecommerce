const User = require('../models/users');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
const { validateUser } = require('../validator');
const transporter = require("../config/email");

dotenv.config();

exports.register = async (req, res) => {
    const { firstName, lastName, password, confirmPassword, email, phone, role } = req.body;

    if( password !== confirmPassword) {
        return res.json("Password doesn't match")
    }

    let {error} = validateUser(req.body)
    if (error) {
        return res.status(400).json({message: error.details[0].message })
    }

    try {
        let user = await User.findOne({email})
        if (user) {
            return res.json("User already exists!...").status(400)
        }

        user = new User({ firstName, lastName, password, confirmPassword, email, phone, role });
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()

        const mailOption = {
            from: process.env.EMAIL_USER, // sender address
            to: user.email, // list of receivers
            subject: "Hello ✔ user", // Subject line
            text: "Hello Stephanie, thanks for signing up with Star Stores", // plain text body
        }

        await transporter.sendMail(mailOption);


        const token = user.generateAuthToken()
        res.header("auth-token", token).json(user)
        
    } catch (error) {
        console.log({message: error.message})
    }
}

// exports.getUser = async ( req, res) => {
//     try {
//         const user = await User.findById({ user: req.user.id});
//         if (!user) {
//             res.status(400).json({ message: "User does not exist"})
//         }
//         res.json(user)
//     } catch (error) {
//         console.log({ message: error.message})
//     }
// }

exports.getUser = async ( req, res) => {
    const {id } = req.body;
    try {
        const user = await User.findById( id );
        if (!user) {
            res.status(400).json({ message: "User does not exist"})
        }
        res.json(user)
    } catch (error) {
        console.log({ message: error.message})
    }
}


exports.getAllUsers = async ( req, res) => {
      try {
         const users = await User.find().populate()
         res.json(users)
      } catch (error) {
        console.log({ message: error.message})
      }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email})
        if (!user) {
           return res.json("Invalid username").status(400)
        }

        const validatePassword = await bcrypt.compare(password, user.password)
        if(!validatePassword) {
            return res.json({ message: "Invalid Password" }).status(400)
        }

        // await res.json(user)

        const token = user.generateAuthToken()
        res.header("auth-token", token).json({token})
        
    } catch (error) {
      console.log({ message: error.message})  
    }
}
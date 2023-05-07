import UserModel from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import Jwt from 'jsonwebtoken';

const test = (req, res) => {
    res.json('test is working')
}

const registerUser =  async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({
                error: 'name is required'
            })
        };

        if (!password || password.length < 6) {
            return res.json({
                error: 'password is required and should be at least 6 character string'
            })
        };

        const exist = await UserModel.findOne({ email });
        if (exist) {
            return res.json({
                error:'email is already in used'
            })
        }
        const hashedPassword = await hashPassword(password)
        const user = await UserModel.create({
            name, email,
            password: hashedPassword
        })

        return res.json(user);

    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user found'
            })
        }

        const match = await comparePassword(password, user.password);
        if (match) {
            Jwt.sign({
                email: user.email,
                id: user._id,
                name: user.name
            }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                return res.cookie('token', token).json(user)
            })
        } else if (!match) {
            return res.json({
                error: 'Password not matched'
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}

export {
    test,
    registerUser,
    loginUser
};
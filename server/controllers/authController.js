import UserModel from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";

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
    
}

export {
    test,
    registerUser,
    loginUser
};
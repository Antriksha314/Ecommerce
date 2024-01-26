import { ComparePassword } from "../../../Helper/Bcrypt.js";
import { GenerateToken } from "../../../Helper/Token.js";
import Users from "../Model/UserModel.js";

export const Register = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await Users.findOne({ email });

        if (user) {
            return res.status(400).json({ success: false, messsage: "User already exist" })
        }

        await Users.create(req.body)

        return res.status(200).json({ success: true, messsage: "User created successfully" })

    } catch (error) {

        return res.status(500).json({ success: false, messsage: error.message })

    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, messsage: "User not found" })
        }

        const matchPassword = await ComparePassword(password, user.password);

        if (!matchPassword) {
            return res.status(400).json({ success: false, messsage: "Wrong password" })
        }

        const token = await GenerateToken({ email: user.email, id: user._id });

        return res.status(200).json({ success: true, messsage: "User login successfully", data: token })

    } catch (error) {

        return res.status(500).json({ success: false, messsage: error.message })

    }
}

export const Me = async (req, res) => {
    try {
        const user = req.user;

        return res.status(200).json({ success: true, data: user })

    } catch (error) {

        return res.status(500).json({ success: false, messsage: error.message })

    }

}

export const ChangePassword = async (req, res) => {
    try {

        const { oldPassword, password, confirmPassword } = req.body;

        const user = await Users.findById(req.user.id);

        if (!user) {
            return res.status(400).json({ success: false, messsage: "User not found" })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, messsage: "Password and confirm password does not match" });
        }


        const matchPassword = await ComparePassword(oldPassword, user.password);

        if (!matchPassword) {
            return res.status(400).json({ success: false, messsage: "Wrong password" });
        }

        const hashedPassword = await GenerateHashPassword(password);

        await Users.updateOne({ _id: user._id }, { password: hashedPassword });

        return res.status(200).json({ success: true, messsage: "Password changed successfully" });

    } catch (error) {

        return res.status(500).json({ success: false, messsage: error.message })
    }

}
import { VerifyToken } from "../Helper/Token.js";
import Users from "../Modules/Users/Model/UserModel.js";

export const Protect = async (req, res, next) => {
    try {
        const { authorization } = req.Headers;

        if (!authorization) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }

        const bearer = authorization.split(" ");

        const bearerToken = bearer[1];

        const token = await VerifyToken(bearerToken);

        if (!token?.email) {
            return res.status(401).json({ success: false, message: "Invalid token " })
        }

        const user = await Users.findOne({ email: token.email }).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user;

        next()
    } catch (error) {

        return res.status(500).json({ success: false, message: error.message })

    }
}
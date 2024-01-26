import Users from "../Model/UserModel.js";

export const UpdateProfile = async (req, res) => {
    try {
        const user = req.user;

        const { firstName, lastName } = req.body;

        await Users.updateOne({ _id: user._id }, { $set: { firstName, lastName } });

        return res.status(200).json({ success: true, messsage: "Profile Updated Successfully" });

    } catch (error) {

        return res.status(500).json({ success: false, messsage: error.message });

    }
}

export const AllUsers = async (req, res) => {
    try {
        const users = await Users.find();

        return res.status(200).json({ success: true, data: users })

    } catch (error) {

        return res.status(500).json({ success: false, messsage: error.message });

    }
}

export const User = async (req, res) => {

    try {
        const user = await Users.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, messsage: "User Not Found" })
        }

        return res.status(200).json({ success: true, data: user })

    } catch (error) {

        return res.status(500).json({ success: false, messsage: error.message });

    }

}
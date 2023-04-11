import { sequelize, user } from "../../config/db.js";
export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return await registerUser(req, res);
    }
}

const registerUser = async (req, res) => {
    try {
        await user.sync({ alter: true });
        const { username, password } = req.body;
        const usernameCheck = await user.findOne({ where: { username: username } })
        if (usernameCheck) {
            return res.status(401).json({ msg: "Username already used", status: false });
        }
        const userCreated = await user.create({ username, password });
        return res.status(200).json({ user: userCreated.toJSON(), status: true });

    } catch (error) {
        return res.status(500).json({ error });
    }
};

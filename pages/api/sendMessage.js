import { sequelize, user, userRoom, room, message } from "../../config/db.js";
export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return await sendMessage(req, res);
    }
}

const sendMessage = async (req, res) => {
    try {
        // await message.sync({ alter: true });
        const { from, to, content } = req.body;
        const data = await message.create({ user_id: from, to, content });
        console.log(data.toJSON());
        return res.status(200).json({ data: data.toJSON(), status: true });

    } catch (error) {
        return res.status(500).json({ error });
    }
};

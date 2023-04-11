import { sequelize, user, userRoom, room, message } from "../../config/db.js";
const { Op } = require("sequelize");
export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return await getMessages(req, res);
    }
}
//TODO: No hace falta usar el json.stringify, lo tego que quitar
const getMessages = async (req, res) => {
    try {
        // await message.sync({ alter: true });
        const { from, to } = req.body;
        const messages = await message.findAll({
            where: {
                user_id: {
                    [Op.or]: [from, to],

                },
                to: {
                    [Op.or]: [to, from],
                }
            },
            order: [
                ['date']
            ]
        })

        const result = JSON.stringify(messages, null, 2);
        const result2 = JSON.parse(result);
        const projectedMessages = result2.map((msg) => {
            return {
                fromSelf: msg.user_id === from,
                message: msg.content,
            };
        });

        return res.status(200).json({ data: projectedMessages, status: true });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

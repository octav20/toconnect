import { user } from "../../../config/db.js";
export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getContact(req, res);
    }
}

const getContact = async (req, res) => {
    try {
        // await user.sync({ alter: true });
        const { id } = req.query;
        const contact = await user.findAll({ where: { username: id } })

        return res.status(200).json({ data: contact, status: true });


    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

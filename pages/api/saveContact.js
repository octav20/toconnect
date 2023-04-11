import { sequelize, user, userRoom, room, message, Contacts } from "../../config/db.js";
const { Op } = require("sequelize");
export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return await saveContact(req, res);
    }
}

const saveContact = async (req, res) => {
    try {
        // await Contacts.sync({ alter: true });
        const { contact_of, contact_id, username } = req.body;
        const userCheck = await user.findOne({ where: { username } })
        if (!userCheck) {
            return res.status(401).json({ msg: "This user doesn't exist", status: false });
        }
        const contactCheck = await Contacts.findOne({ where: { contact_of, contact_id } })
        if (contactCheck) {
            return res.status(401).json({ msg: "This contact already exist", status: false });

        }
        const contact = await Contacts.create({ contact_of, contact_id, username });
        return res.status(200).json({ data: contact.toJSON(), status: true });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

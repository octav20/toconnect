import { Contacts } from "../../../config/db.js";
export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getContacts(req, res);
    }
}

const getContacts = async (req, res) => {
    try {
        await Contacts.sync({ alter: true });
        const { id } = req.query;
        const contacts = await Contacts.findAll({ where: { contact_of: id } })

        return res.status(200).json({ data: contacts, status: true });


    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

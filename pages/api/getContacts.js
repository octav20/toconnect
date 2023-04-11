import { Contacts } from "../../config/db.js";
export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return await getContacts(req, res);
    }
}

const getContacts = async (req, res) => {
    try {
        // await Contacts.sync({ alter: true });
        const { contact_of } = req.body;
        const contacts = await Contacts.findAll({ where: { contact_of } })
        if (contacts.length > 0) {
            return res.status(200).json({ data: contacts, status: true });
        }
        return res.status(404).json({ message: "No contacts found", status: false });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

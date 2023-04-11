import { sequelize, user } from "../../config/db.js";
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return await loginUser(req, res);
    }
}

const loginUser = async (req, res) => {
    try {
        // await user.sync({ alter: true });
        const { username, password } = req.body;
        const userCheck = await user.findOne({ where: { username: username } })
        if (!userCheck) {
            return res.status(401).json({ msg: "Incorrect Username or Password", status: false });
        }
        if (userCheck.password !== password) {
            return res.status(401).json({ msg: "Incorrect Username or Password", status: false });

        }
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
            username: userCheck.username,
            id: userCheck.id,
        }, "secret")
        const serializedToken = serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
            path: "/"
        })
        res.setHeader("Set-Cookie", serializedToken);
        return res.status(200).json({ user: { id: userCheck.id, username: userCheck.username }, status: true });

    } catch (error) {
        return res.status(500).json({ error });
    }
};

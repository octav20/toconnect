import jwt, { sign, verify } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { useRouter } from 'next/router';
export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return await signOut(req, res);
    }
}

const signOut = async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "There isn't token" });

    }
    try {

        verify(token, "secret");

        const serializedToken = serialize("token", null, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
            path: "/"
        })
        res.setHeader("Set-Cookie", serializedToken);

        return res.status(200).json({ mensaje: "You're out of the site" });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

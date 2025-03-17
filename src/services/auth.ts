import { google } from "googleapis";
import prisma from "../lib/db";
import { oauth2Client } from "../lib/oauth";
import * as jwt from "../lib/jwt";

export const googleAuth = async (token: string) => {
    if (!token) {
        throw new Error("Token is required");
    }


    const ticket = await oauth2Client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email || !payload?.name || !payload?.sub) {
        throw new Error("Invalid Google Token");
    }


    let user = await prisma.user.findUnique({
        where: { email: payload.email },
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                email: payload.email,
                name: payload.name,
                avatarUrl: payload.picture || "",
            },
        });

        await prisma.cart.create({
            data: {
                userId: user.id
            }
        });
    }

    const accessToken = await jwt.createAccesToken(user.id);

    return { accessToken };
};

export const profile = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    return user;
};

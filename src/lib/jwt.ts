import { createJWT, validateJWT } from "oslo/jwt";
import { TimeSpan } from "oslo";
import prisma from "./db";

const SECRET_KEY = process.env.JWT_SECRET || "secret";

const getEncodedSecret = async (): Promise<ArrayBuffer> => {
    if (!SECRET_KEY) throw new Error("Secret token is not defined");

    return new TextEncoder().encode(SECRET_KEY).buffer as ArrayBuffer;
};

// Create token
const createToken = async (
    userId: string,
    expiresIn: TimeSpan
): Promise<string> => {
    const secret = await getEncodedSecret();
    const options = {
        subject: userId,
        expiresIn,
        includeIssuedTimestamp: true,
    };

    return await createJWT("HS256", secret, {}, options);
};

// Create an access JWT token with 1 day expiration time.
export const createAccesToken = async (
    userId: string,
    expiresInMinute: number = 1440
) => {
    try {
        return await createToken(userId, new TimeSpan(expiresInMinute, "m"));
    } catch (error: Error | any) {
        throw new Error("Failed to create acces token", error.message);
    }
};

// Validates a given token
export const validateToken = async (token: string) => {
    try {
        const secretKey = await getEncodedSecret();
        return await validateJWT("HS256", secretKey, token);
    } catch (error: Error | any) {
        throw new Error("Token invalid", error.message);
    }
};
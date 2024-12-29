"use server";

import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const expirationDays = 7;
const encodedSecretKey = new TextEncoder().encode("env-secret-key");

type SessionPayload = {
    userId: string;
    expiresAt: Date;
}

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(payload.expiresAt).sign(encodedSecretKey);
};

export async function decrypt(token: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(token, encodedSecretKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session:', error)
        return null
    };
};

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000);
    const sessionToken = await encrypt({ userId, expiresAt: expiresAt });
    (await cookies()).set("session", sessionToken, {
        httpOnly: true,
        secure: true,
        expires: expiresAt
    });
    return sessionToken;
};

export async function deleteSession() {
    (await cookies()).delete("session");
};

// export async function getSession(token: string) {
//     const { payload } = await decrypt(token);
//     payload.exp = new Date(payload.exp);
//     if (payload.expiresAt < new Date.now()) {
//         return null;
//     }
//     return payload.userId;
// }

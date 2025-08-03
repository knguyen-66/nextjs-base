"use server";

import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const expirationDays = 7;
const encodedSecretKey = new TextEncoder().encode("env-secret-key");

type SessionPayload = {
    userId: number;
    expiresAt: Date;
}

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(payload.expiresAt).sign(encodedSecretKey);
};

export async function decrypt(token: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(token, encodedSecretKey, {
            algorithms: ['HS256'],
        });
        return payload
    } catch (error) {
        console.info('Failed to verify session:', error.message);
    };
};

export async function createSession(userId: number) {
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

export async function getSessionPayload(token: string | undefined = "") {
    const jwtPayload = await decrypt(token);
    if (!jwtPayload || !jwtPayload.exp || jwtPayload.exp < new Date().getTime() / 1000) {
        return undefined;
    }
    return jwtPayload as SessionPayload;
}

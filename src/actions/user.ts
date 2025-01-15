"use server";

import "server-only";
import * as argon2 from 'argon2';
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { getSessionPayload } from "@/lib/session";
import { EditUserFormSchema, EditUserFormState } from "@/lib/schema";

export async function getUser() {
    console.info("fetching user");
    const cookie = (await cookies()).get('session')?.value;
    if (!cookie) {
        return undefined;
    }
    const payload = await getSessionPayload(cookie);
    if (!payload || !payload.userId) {
        return undefined;
    }
    const user = await db.select({
        id: userTable.id,
        username: userTable.username,
        id_role: userTable.id_role
    }).from(userTable).where(eq(userTable.id, payload.userId)).limit(1);
    if (user.length == 0) {
        return undefined;
    }
    return user[0];
}

export async function editUserInformation(state: EditUserFormState, formData: FormData) {
    const validatedFields = EditUserFormSchema.safeParse({
        oldPassword: formData.get('oldPassword') as string,
        newPassword: formData.get('newPassword') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    });
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }
    if (validatedFields.data.newPassword !== validatedFields.data.confirmPassword) {
        return { errors: { confirmPassword: ['New passwords do not match'] } } as EditUserFormState;
    }

    const session = (await cookies()).get('session')?.value;
    const payload = await getSessionPayload(session);
    if (!payload || !payload.userId) {
        return { errors: { oldPassword: ['User not authenticated'] } } as EditUserFormState;
    }

    const user = await db.select().from(userTable).where(eq(userTable.id, payload.userId)).limit(1);
    if (user.length == 0 || !argon2.verify(user[0].password, validatedFields.data.oldPassword)) {
        return { errors: { oldPassword: ['Incorrect password'] } } as EditUserFormState;
    }

    try {
        await db.update(userTable).set({
            password: await argon2.hash(validatedFields.data.newPassword)
        }).where(eq(userTable.id, payload.userId));

        return { message: 'Password updated' } as EditUserFormState;
    }
    catch (error) {
        console.log(error);
        return { errors: { oldPassword: ['Error when updating password'] } } as EditUserFormState;
    }
}
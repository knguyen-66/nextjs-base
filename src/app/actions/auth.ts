"use server";

import "server-only";
import { redirect } from "next/navigation";
import * as argon2 from "argon2";
import { eq, or } from "drizzle-orm";
import { db } from "@/app/db";
import { usersTable } from "../db/schema";
import { SignupFormSchema, SignupFormState, LoginFormSchema, LoginFormState } from "@/app/lib/schema"
import { createSession, deleteSession } from "@/app/lib/session";

// const testUser = {
//     id: "1",
//     username: 'testuser',
//     email: 'testuser@email.com',
//     password: 'testpassword',
// };

export async function register(state: SignupFormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get('username') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const existedUsers = await db.select().from(usersTable).where(or(
        eq(usersTable.username, validatedFields.data.username),
        eq(usersTable.email, validatedFields.data.email))).limit(1);
    if (existedUsers.length > 0) {
        return { errors: ['Username or email existed'] } as SignupFormState;
    }

    try {
        await db.insert(usersTable).values({
            username: validatedFields.data.username,
            email: validatedFields.data.email,
            password: await argon2.hash(validatedFields.data.password)
        });
    } catch (error) {
        console.log(error);
        return { errors: ['Error when insert new User. Please try again later'] } as SignupFormState;
    }
}

export async function login(state: LoginFormState, formData: FormData) {
    const validatedFields = LoginFormSchema.safeParse({
        username: formData.get('username') as string,
        password: formData.get('password') as string,
    });
    console.log('username:' + formData.get('username') + ':' + validatedFields.success);
    debugger;
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const existedUser = await db.select().from(usersTable).where(eq(usersTable.username, validatedFields.data.username)).limit(1);
    if (existedUser.length == 0 || !await argon2.verify(existedUser[0].password, validatedFields.data.password)) {
        return { errors: { password: ['Invalid username or password'] } } as LoginFormState;
    }
    await createSession(String(existedUser[0].id));
    redirect('/');
}

export async function logout() {
    deleteSession();
    redirect('/login');
}
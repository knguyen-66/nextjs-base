"use server";

import "server-only";
import { SignupFormSchema, SignupFormState, LoginFormSchema, LoginFormState } from "../lib/schema"
import { createSession, deleteSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

const testUser = {
    id: "1",
    username: 'testuser',
    email: 'testuser@email.com',
    password: 'testpassword',
};

export async function register(state: SignupFormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get('username') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
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
    if (formData.get('username') !== testUser.username || formData.get('password') !== testUser.password) {
        return { errors: { password: ['Invalid username or password'] } };
    }
    await createSession(testUser.id);
    redirect('/');
}

export async function logout() {
    deleteSession();
    redirect('/login');
}
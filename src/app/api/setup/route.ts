import { NextRequest, NextResponse } from 'next/server';
import * as argon2 from "argon2";
import { db } from '@/app/db';
import { usersTable } from '@/app/db/schema';

// type ResponseData = {
//     message: string
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
    // const testUser = await db.select().from(usersTable).where(eq(usersTable.username, "testuser")).limit(1);
    // if (!testUser) {
    const user: typeof usersTable.$inferInsert = {
        email: 'testuser@example.com',
        username: 'testuser',
        password: await argon2.hash('testpassword'),
    };
    try {
        await db.insert(usersTable).values(user).returning();
        return NextResponse.json({ message: "Test user created." }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Test user already existed." }, { status: 200 })
    }
}
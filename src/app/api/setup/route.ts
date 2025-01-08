import { NextRequest, NextResponse } from 'next/server';
import * as argon2 from "argon2";
import { db } from '@/db';
import { roleTable, userTable } from '@/db/schema';

// type ResponseData = {
//     message: string
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
    // const testUser = await db.select().from(usersTable).where(eq(usersTable.username, "testuser")).limit(1);
    // if (!testUser) {
    const adminRole: typeof roleTable.$inferInsert = {
        name: 'Admin',
        description: 'Base admin role. Can do anything.',
        is_admin_role: 1,
    };
    const testUser: typeof userTable.$inferInsert = {
        email: 'testuser@example.com',
        username: 'testuser',
        password: await argon2.hash('testuserpassword'),
    };
    const testAdmin: typeof userTable.$inferInsert = {
        email: 'testadmin@example.com',
        username: 'testadmin',
        password: await argon2.hash('testadminpassword'),
    };

    try {
        const insertedRole = await db.insert(roleTable).values(adminRole).returning();
        testAdmin.id_role = insertedRole[0].id;
        await db.insert(userTable).values(testUser);
        await db.insert(userTable).values(testAdmin);
        return NextResponse.json({ message: "Test users created." }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Test users already existed." }, { status: 200 })
    }
}
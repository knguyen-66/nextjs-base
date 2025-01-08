import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';

export const db = drizzle({
    connection: {
        // url: process.env.DB_FILE_NAME!
        url: "file:app.db",
    },
});

// async function test_db() {
// const testUser = await db.select().from(usersTable).where(eq(usersTable.username, "testuser")).limit(1);
// if (!testUser) {
//     const user: typeof usersTable.$inferInsert = {
//         email: 'testuser@example.com',
//         username: 'testuser',
//         password: 'testpassword',
//     };

//     await db.insert(usersTable).values(user);
//     console.log('New user created!')
// }

//     const users = await db.select().from(usersTable);
//     console.log('Getting all users from the database: ', users)

//     await db
//         .update(usersTable)
//         .set({
//             username: "testuser2",
//         })
//         .where(eq(usersTable.email, user.email));
//     console.log('User info updated!')

//     await db.delete(usersTable).where(eq(usersTable.email, user.email));
//     console.log('User deleted!')
// }

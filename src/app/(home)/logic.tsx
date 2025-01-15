"use server"

import { db } from "@/db";
import { userTable } from "@/db/schema";

export const testDB = async () => {
    db.select().from(userTable).then((users) => {
        console.log('Getting all users from the database: ', users);
    });
}
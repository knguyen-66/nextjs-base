import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("table_users", {
    id: int().primaryKey({ autoIncrement: true }),
    email: text().notNull().unique(),
    username: text().notNull().unique(),
    password: text().notNull(),
});
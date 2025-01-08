import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const roleTable = sqliteTable("table_role", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull().unique(),
    description: text().notNull(),
    is_admin_role: int().default(0),
});

export const userTable = sqliteTable("table_user", {
    id: int().primaryKey({ autoIncrement: true }),
    email: text().notNull().unique(),
    username: text().notNull().unique(),
    password: text().notNull(),
    id_role: int().references(() => roleTable.id),
});


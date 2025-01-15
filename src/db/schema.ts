import { sql } from "drizzle-orm";
import { check, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

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

export const unitTable = sqliteTable("table_unit", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    phone: text().notNull(),
    addressCodeProvince: int(),
    addressCodeDistrict: int(),
    addressCodeWard: int(),
    addressDetail: text(),
    type: text().notNull().default("Client"),
}, (table) => [{
    checkConstraint: check("type_constraint", sql`${table.type} IN ["Client", "Collector", "Recycler"]`),
}]);


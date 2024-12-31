import { db } from "@/app/db"
import { logout } from "./actions/auth";
import { usersTable } from "./db/schema";

export default function Home() {
    return (
        <section>
            <div className="flex flex-col gap-2 justify-start">
                <h1>Home</h1>

                <button className="w-40 bg-gray-700" onClick={async () => {
                    "use server";
                    db.select().from(usersTable).then((users) => {
                        console.log('Getting all users from the database: ', users);
                    });
                }}>Test DB</button>

                <button className="w-40 bg-gray-700" onClick={logout}>Log out</button>
            </div>
        </section>
    );
}

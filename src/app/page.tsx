// import getSession from ""

import {Button} from "@/components/ui/button";
import {logout} from "./actions/auth";

export default function Home() {
    return (
        <section>
            <Button>Click me</Button>
            <h1>Home</h1>

            <button onClick={logout}>Log out</button>
        </section>
    );
}

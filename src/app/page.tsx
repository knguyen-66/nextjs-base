// import getSession from ""

import { logout } from "./actions/auth";

export default function Home() {
  return (
    <section>
      <h1>Home</h1>
      <button onClick={logout}>Log out</button>
    </section>
  );
}

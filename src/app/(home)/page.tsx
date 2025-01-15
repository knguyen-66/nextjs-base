"use client"

import { useGlobalContext } from "@/context/GlobalContextProvider";
import { testDB } from "./logic";
import { useEffect } from "react";

export default function HomePage() {
    const { setTitle } = useGlobalContext();
    useEffect(() => {
        setTitle("Home");
    }, []);
    return (
        <section>
            <div className="flex flex-col gap-2 justify-start">
                <h1>Home</h1>
                <button className="w-40 bg-gray-700" onClick={testDB}>Test DB</button>
            </div>
        </section>
    );
}

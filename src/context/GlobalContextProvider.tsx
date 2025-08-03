"use client"
import React from "react";
import { createContext, useContext } from "react";

type Context = {
    title: string;
    setTitle: (title: string) => void;
}

const GlobalContext = createContext<Context>({
    title: "GRAC",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setTitle: function(title: string): void {
        throw new Error("Function not implemented.");
    }
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [title, setTitle] = React.useState("GRAC");
    return (
        <GlobalContext.Provider value={{ title, setTitle }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}

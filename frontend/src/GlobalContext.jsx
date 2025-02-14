import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
   // const [user, setUser] = useState(null); // Example global state
    let [authStatus, authStatusLoader] = useState(false);

    return (
        <GlobalContext.Provider value={{ authStatus, authStatusLoader }}>
            {children}
        </GlobalContext.Provider>
    );
};
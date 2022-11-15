import { useState, createContext } from "react"

const UserContext = createContext({
    isLogged: {auth: false, role: ""},
    setIsLogged: ( auth ) => {}
});

export default UserContext;
import { useState, createContext } from "react"

const UserContext = createContext({
    isLogged: null,
    hasRole: null
});

export default UserContext;
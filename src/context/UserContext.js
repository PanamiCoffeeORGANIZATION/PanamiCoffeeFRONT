import { useState, createContext } from "react"

const UserContext = createContext({
    email: null,
    img: null,
    name: null,
    role: null,
});

export default UserContext;
import { Alert } from "@mui/material";
import { useEffect, useState } from "react";

export const AlertUI = (props) => {

    const { text, type, close } = props;

    return (
        <Alert style={{zIndex:"10000"}} className="alert" severity={type} onClose={() => {close([false])}}>{text}</Alert>
    )
}

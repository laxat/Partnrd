import React from "react";
import axios from "axios";

export let userid = "";

export async function getUser() {
    const currUser = "http://localhost:8000/api/user";

    const token = sessionStorage.getItem("xrsf");

    const config = {
    headers: { Authorization: `Bearer ${token}` },
};
    const data = await axios
    .get(currUser, config)
    .then((res) => {
        const id = res.data.id;
        return id
        
    })
    .catch((err) => {
    console.log(err);
    sessionStorage.removeItem("xrsf");
    });
    return null; 
}
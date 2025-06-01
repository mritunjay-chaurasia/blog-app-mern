import React, { useState, useEffect } from "react";
import { allUsers } from "../../apis/user";

const DashboardPage = () => {
    useEffect(() => {
        (async () => {
            const response = await allUsers()
            console.log("all users::::::::::::", response)
        })()
    }, []);

    return (
        <>
            <h1>Dashboard Page</h1>
        </>
    )
}

export default DashboardPage
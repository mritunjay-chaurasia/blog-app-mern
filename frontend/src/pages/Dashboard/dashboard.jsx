import React, { useState, useEffect } from "react";
import { allUsers } from "../../apis/user";
import ChatSection from "../../components/ChatApp/ChatApp";
import Sidebar from "../../components/ChatApp/Sidebar";

const DashboardPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await allUsers()
            setUsers(response.users)
            console.log("all users::::::::::::", response)
        })()
    }, []);

    return (
        <>
            <div style={{ display: 'flex', height: '100vh' }}>
                <Sidebar users={users} onUserSelect={setSelectedUser} />
                <ChatSection user={selectedUser} />
            </div>
        </>
    )
}

export default DashboardPage
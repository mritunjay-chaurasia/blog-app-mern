import React, { useState, useEffect } from "react";
import { allUsers } from "../../apis/user";
import ChatSection from "../../components/ChatApp/ChatApp";
import Sidebar from "../../components/ChatApp/Sidebar";
import { userInfo } from '../../apis/user';

const DashboardPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        (async () => {
            try {
                const response = await userInfo()
                const re = await allUsers()
                if (re?.success) {
                    setCurrentUser(response.user)
                    setUsers(re.users.filter((user) => user._id !== response.user._id))
                }
            } catch (err) {
                console.error("Error during fetching personal info", err);
            }
        })()
    }, []);


    return (
        <>
            <div style={{ display: 'flex', height: '100vh' }}>
                <Sidebar users={users} onUserSelect={setSelectedUser} />
                <ChatSection user={selectedUser} currentUser={currentUser}/>
            </div>
        </>
    )
}

export default DashboardPage
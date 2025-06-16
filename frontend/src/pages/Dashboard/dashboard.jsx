import React, { useState, useEffect } from "react";
import { allUsers, userInfo } from "../../apis/user";
import { fetchGroups } from "../../apis/chat";
import ChatSection from "../../components/ChatApp/ChatApp";
import GroupChatSection from "../../components/ChatApp/GroupChatSection";
import Sidebar from "../../components/ChatApp/Sidebar";

const DashboardPage = () => {
  const [selectedChat, setSelectedChat] = useState(null); // Can be user or group
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await userInfo();
        const re = await allUsers();
        const groupData = await fetchGroups();

        if (re?.success && groupData?.success) {
          setCurrentUser(response.user);
          setUsers(re.users.filter((u) => u._id !== response.user._id));
          setGroups(groupData.groups);
        }
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    })();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        users={users}
        groups={groups}
        onUserSelect={(user) => {
          setSelectedChat(user);
          setIsGroupChat(false);
        }}
        onGroupSelect={(group) => {
          setSelectedChat(group);
          setIsGroupChat(true);
        }}
      />
      {selectedChat ? (
        isGroupChat ? (
          <GroupChatSection group={selectedChat} currentUser={currentUser} />
        ) : (
          <ChatSection user={selectedChat} currentUser={currentUser} />
        )
      ) : (
        <div style={{ flex: 1, padding: "20px" }}>Select a user or group to chat</div>
      )}
    </div>
  );
};

export default DashboardPage;

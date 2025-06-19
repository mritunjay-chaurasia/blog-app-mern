import React, { useState, useEffect } from "react";
// import { allUsers, userInfo } from "../../apis/user.api";
// import { fetchGroups } from "../../apis/chat.api";
// import ChatSection from "../../components/ChatApp/ChatApp";
// import GroupChatSection from "../../components/ChatApp/GroupChatSection";
// import Sidebar from "../../components/ChatApp/Sidebar";

const DashboardPage = () => {
  // const [selectedChat, setSelectedChat] = useState(null); // Can be user or group
  // const [isGroupChat, setIsGroupChat] = useState(false);
  // const [otherUsers, setOtherUsers] = useState([]);
  // const [groups, setGroups] = useState([]);
  // const [currentUser, setCurrentUser] = useState();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await userInfo();
  //       const re = await allUsers();
  //       const groupData = await fetchGroups();

  //       if (re?.success && groupData?.success) {
  //         setCurrentUser(response.user);
  //         setOtherUsers(re.users.filter((u) => u._id !== response.user._id));
  //         setGroups(groupData.groups);
  //       }
  //     } catch (err) {
  //       console.error("Failed to load dashboard data", err);
  //     }
  //   })();
  // }, []);

  return (
    <div className="w-100">
      <h1>Dashboard</h1>
      {/* <Sidebar
        otherUsers={otherUsers}
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
          <ChatSection selectedUser={selectedChat} currentUser={currentUser} />
        )
      ) : (
        <div style={{ flex: 1, padding: "20px" }}>Select a user or group to chat</div>
      )} */}
    </div>
  );
};

export default DashboardPage;

import React, { useState, useEffect } from 'react';
import { socket } from "../../../socket";
import { fetchGroupMessages } from "../../apis/chat.api";
import ChatSectionArea from '../ChatSectionArea';

const GroupChatSection = ({ group, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showTyping, setShowTyping] = useState(false)

  useEffect(() => {
    if (!group?._id) return;

    // Join group room via socket
    socket.emit("joinGroup", group._id);


    // Fetch group messages
    (async () => {
      const response = await fetchGroupMessages(group._id);
      console.log("response::", response)
      if (response.success) {
        setMessages(response.messages);
      }
    })();

    // 3. Listen for new messages
    socket.on("receiveGroupMessage", (data) => {
      if (data.chatId === group._id) {
        setMessages((prev) => [...prev, {
          sender: data.senderId,
          content: data.content,
        }]);
      }
    });

    socket.on("start-typing", (data) => {
      if (data.receiverId === group._id && data.senderId !== currentUser._id) {
        setShowTyping(true);
      }
    });

    socket.on("stop-typing", (data) => {
      if (data.receiverId === group._id && data.senderId !== currentUser._id) {
        setShowTyping(false);
      }
    });



    return () => {
      socket.off("receiveGroupMessage");
      socket.off("start-typing");
      socket.off("stop-typing");
    };
  }, [group]);

  const handleSend = () => {
    if (msg.trim()) {
      const messageData = {
        senderId: currentUser._id,
        chatId: group._id,
        content: msg,
      };

      socket.emit('sendGroupMessage', messageData);

      setMessages((prev) => [...prev, {
        sender: currentUser._id,
        content: msg,
      }]);

      setMsg('');
    }
  };
  const handleOnChange = (e) => {
    setMsg(e.target.value);
    socket.emit("start-typing", {
      senderId: currentUser._id,
      receiverId: group._id,
    });

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      socket.emit("stop-typing", {
        senderId: currentUser._id,
        receiverId: group._id,
      });
    }, 1500);

    setTypingTimeout(timeout);
  };

  if (!group) {
    return <div style={{ flex: 1, padding: '20px' }}>Select a group to start chatting</div>;
  }

  return (
    <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <h3>Group: {group.chatName}</h3>
      <ChatSectionArea messages={messages} currentUser={currentUser} handleSend={handleSend} handleOnChange={handleOnChange} msg={msg} showTyping={showTyping}/>
    </div>
  );
};

export default GroupChatSection;

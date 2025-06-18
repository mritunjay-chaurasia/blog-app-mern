import React, { useState, useEffect } from 'react';
import { socket } from "../../../socket";
import { fetchChatMessages, fetchChat } from '../../apis/chat.api';
import ChatSectionArea from '../ChatSectionArea';

const ChatSection = ({ selectedUser, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const [showTyping, setShowTyping] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetchChatMessages(selectedUser._id)
      const { chat } = await fetchChat(selectedUser._id)
      console.log("chat:::", chat)
      if (response.success) {
        setMessages(response.messages)
      }
    })()

    socket.emit("joinRoom", currentUser._id);

    socket.on("receiveMessage", (data) => {
      if (data.senderId === selectedUser._id || data.senderId === currentUser._id) {
        setMessages((prev) => [...prev, {
          sender: data.senderId,
          content: data.content,
        }]);
      }
    });

    socket.on("start-typing", (data) => {
      if (data.senderId === selectedUser._id) {
        setShowTyping(true);
      }
    });

    socket.on("stop-typing", (data) => {
      if (data.senderId === selectedUser._id) {
        setShowTyping(false);
      }
    });



    return () => {
      socket.off("receiveMessage");
      socket.off("start-typing");
      socket.off("stop-typing");
    };
  }, [selectedUser, socket]);


  const handleSend = () => {
    if (msg.trim()) {
      const messageData = {
        senderId: currentUser._id,
        receiverId: selectedUser._id,
        content: msg,
      };
      socket.emit('sendMessage', messageData);
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
      receiverId: selectedUser._id,
    });

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      socket.emit("stop-typing", {
        senderId: currentUser._id,
        receiverId: selectedUser._id,
      });
    }, 1500);

    setTypingTimeout(timeout);
  };


  if (!selectedUser) {
    return <div style={{ flex: 1, padding: '20px' }}>Select a user to start chatting</div>;
  }

  return (
    <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <h3>Chat with {selectedUser.fullName}</h3>
      <ChatSectionArea messages={messages} currentUser={currentUser} handleSend={handleSend} handleOnChange={handleOnChange} msg={msg} showTyping={showTyping} />
    </div>
  );
};

export default ChatSection;

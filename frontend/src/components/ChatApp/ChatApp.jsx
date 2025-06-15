import React, { useState, useEffect } from 'react';
import { socket } from "../../../socket";
import { userInfo } from '../../apis/user';

const ChatSection = ({ user, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      if (data.senderId === user._id) {
        setMessages((prev) => [...prev, { sender: user.name, text: data.content }]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [user]);


  const handleSend = () => {
    if (msg.trim()) {
      const messageData = {
        senderId: currentUser._id,
        receiverId: user._id,
        content: msg,
      };
      socket.emit('sendMessage', messageData);
      setMessages([...messages, { sender: 'Me', text: msg }]);
      setMsg('');
    }
  };

  if (!user) {
    return <div style={{ flex: 1, padding: '20px' }}>Select a user to start chatting</div>;
  }

  return (
    <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <h3>Chat with {user.fullName}</h3>
      <div style={{ flex: 1, border: '1px solid #ccc', marginBottom: '10px', padding: '10px', overflowY: 'auto' }}>
        {messages.map((m, index) => (
          <div key={index} style={{ margin: '5px 0' }}>
            <strong>{m.sender}: </strong>{m.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={handleSend} style={{ padding: '8px 12px' }}>Send</button>
      </div>
    </div>
  );
};

export default ChatSection;

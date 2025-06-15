import React, { useState } from 'react';
import { socket } from "../../../socket";

const ChatSection = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');

  const handleSend = () => {
    if (msg.trim()) {
      // socket.emit('dashboard', response);
      setMessages([...messages, { sender: 'Me', text: msg }]);
      setMsg('');
    }
  };

  if (!user) {
    return <div style={{ flex: 1, padding: '20px' }}>Select a user to start chatting</div>;
  }

  return (
    <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <h3>Chat with {user.name}</h3>
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

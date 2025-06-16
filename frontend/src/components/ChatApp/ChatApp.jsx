import React, { useState, useEffect } from 'react';
import { socket } from "../../../socket";
import { fetchChat } from '../../apis/chat';

const ChatSection = ({ user, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      const response = await fetchChat(user._id)
      if (response.success) {
        console.log("Chat response:::", response)
        setMessages(response.messages)
      }
    })()
    socket.on("receiveMessage", (data) => {
      if (data.senderId === user._id || data.senderId === currentUser._id) {
        setMessages((prev) => [...prev, {
          sender: data.senderId,
          content: data.content,
        }]);
      }

    });


    return () => {
      socket.off("receiveMessage");
    };
  }, [user, socket]);


  const handleSend = () => {
    if (msg.trim()) {
      const messageData = {
        senderId: currentUser._id,
        receiverId: user._id,
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

  if (!user) {
    return <div style={{ flex: 1, padding: '20px' }}>Select a user to start chatting</div>;
  }

  return (
    <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <h3>Chat with {user.fullName}</h3>
      {messages.map((m, index) => {
        const isMe = m.sender === currentUser._id;

        return (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: isMe ? 'flex-end' : 'flex-start',
              marginBottom: '5px'
            }}
          >
            <div
              style={{
                maxWidth: '60%',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: isMe ? '#dcf8c6' : '#f1f0f0',
                alignSelf: isMe ? 'flex-end' : 'flex-start',
              }}
            >
              <div>{m.content}</div>
            </div>
          </div>
        );
      })}

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="content"
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

import React, { useState, useEffect } from 'react';
import { socket } from "../../../socket";
import { fetchGroupMessages } from "../../apis/chat";

const GroupChatSection = ({ group, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!group?._id) return;

    // Join group room via socket
    socket.emit("joinGroupRoom", group._id);

    // Fetch group messages
    (async () => {
      const response = await fetchGroupMessages(group._id);
      console.log("response::",response)
      if (response.success) {
        setMessages(response.messages);
      }
    })();

    // 3. Listen for new messages
    socket.on("receiveGroupMessage", (data) => {
        console.log("receiveGroupMessage::",data)
      if (data.chatId === group._id) {
        setMessages((prev) => [...prev, {
          sender: data.senderId,
          content: data.content,
        }]);
      }
    });

    return () => {
      socket.off("receiveGroupMessage");
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

  if (!group) {
    return <div style={{ flex: 1, padding: '20px' }}>Select a group to start chatting</div>;
  }

  return (
    <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <h3>Group: {group.chatName}</h3>

      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }}>
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
                  backgroundColor: isMe ? '#cce5ff' : '#e6e6e6',
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                }}
              >
                <div>{m.content}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
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

export default GroupChatSection;

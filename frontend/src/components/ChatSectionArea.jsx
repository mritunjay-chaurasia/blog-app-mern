import TypingIndicator from "./TypingIndication/TypingIndication";

const ChatSectionArea = ({ messages, currentUser, handleSend, handleOnChange, msg, showTyping }) => {


    return (
        <>
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
            {showTyping && <TypingIndicator />}
            <div style={{ display: 'flex', gap: '10px' }}>
                <input
                    value={msg}
                    onChange={(e) => handleOnChange(e)}
                    placeholder="Type a message..."
                    style={{ flex: 1, padding: '8px' }}
                />
                <button onClick={handleSend} style={{ padding: '8px 12px' }}>Send</button>
            </div>
        </>
    )
}
export default ChatSectionArea;
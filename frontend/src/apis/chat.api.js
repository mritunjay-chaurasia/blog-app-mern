
import clientApis from './index.api'

const createGroup = async (chatName, userIds) => {
    try {
        const { data } = await clientApis.post('/chat/create-group', {
            chatName,
            users: userIds,
        });
        return data;
    } catch (err) {
        console.error("Error during createGroup", err)
        const errMsg = err?.response?.data
        return { success: false, message: err.message || errMsg };
    }
};

async function fetchChatMessages(receiverId) {
    try {
        const response = await clientApis.get(`/chat/chat-messages?receiverId=${receiverId}`)
        return response.data
    } catch (err) {
        console.error("Error during fetch ChatMessages", err)
        const errMsg = err?.response?.data
        return { success: false, message: err.message || errMsg };
    }
};

const fetchGroupMessages = async (chatId) => {
    try {
        const { data } = await clientApis.get(`/chat/group-messages?chatId=${chatId}`);
        return data;
    } catch (err) {
        console.error("Error during fetch GroupMessages", err)
        const errMsg = err?.response?.data
        return { success: false, message: err.message || errMsg };
    }
};

const fetchGroups = async () => {
    try {
        const { data } = await clientApis.get("/chat/groups");
        return data;
    } catch (err) {
        console.error("Error during fetchGroups", err)
        const errMsg = err?.response?.data
        return { success: false, message: err.message || errMsg };
    }
};

const fetchChat = async (receiverId) => {
    try {
        const { data } = await clientApis.get(`/chat/chat?receiverId=${receiverId}`);
        return data;
    } catch (err) {
        console.error("Error during fetchChat", err)
        const errMsg = err?.response?.data
        return { success: false, message: err.message || errMsg };
    }
};

export { createGroup, fetchChatMessages, fetchGroupMessages, fetchGroups, fetchChat }



import clientApis from './index'

const createGroup = async (chatName, userIds) => {
  try {
    const { data } = await clientApis.post('/chat/create-group', {
      chatName,
      users: userIds,
    });
    return data;
  } catch (err) {
    return { success: false, message: err.message };
  }
};

async function fetchChat(receiverId) {
    try {
        const response = await clientApis.get(`/chat/fetch-chat?receiverId=${receiverId}`)
        return response.data
    } catch (err) {
        console.error("Error during fetching chat", err)
        const errMsg = err?.response?.data
        return errMsg
    }
};

const fetchGroupMessages = async (chatId) => {
    try {
        const { data } = await clientApis.get(`/chat/group-messages?chatId=${chatId}`);
        return data;
    } catch (err) {
        return { success: false, message: err.message };
    }
};


const fetchGroups = async () => {
    try {
        const { data } = await clientApis.get("/chat/groups");
        return data;
    } catch (err) {
        return { success: false, message: err.message };
    }
};

export {createGroup, fetchChat, fetchGroupMessages, fetchGroups }


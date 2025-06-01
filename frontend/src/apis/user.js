import clientApis from './index'

const signup = async (data) => {
    try {
        const response = await clientApis.post('/user/sign-up', data);
        return response.data
    }
    catch (error) {
        const errMsg = error?.response?.data
        return errMsg
    }
}

const login = async (data) => {
    try {
        const response = await clientApis.post('/user/login', data);
        return response.data
    }
    catch (error) {
        const errMsg = error?.response?.data
        console.error("Error during login", errMsg)
        return errMsg
    }
};

const forgotPassword = async (email) => {
    try {
        const response = await clientApis.post(`/user/forgot-password/${email}`);
        return response.data
    } catch (err) {
        const errMsg = err?.response?.data
        console.error("Error during forgot password", errMsg)
        return errMsg
    }
};

const resetPassword = async (data) => {
    try {
        const response = await clientApis.post('/user/reset-password', data);
        return response.data
    } catch (err) {
        const errMsg = err?.response?.data
        console.error("Error during reset password", errMsg)
        return errMsg
    }
};

const deleteAccount = async () => {
    try {
        const response = await clientApis.delete('/user/delete-account');
        return response?.data
    } catch (err) {
        const errMsg = err?.response?.data

        console.error("Error during delete account", errMsg)
        return errMsg
    }
}


const userInfo = async () => {
    try {
        const response = await clientApis.get('/user/user-info');
        return response?.data
    } catch (err) {
        const errMsg = err?.response?.data
        console.error("Error during fetching user info", errMsg)
        return errMsg
    }
}


const allUsers = async () => {
    try {
        const response = await clientApis.get('/user/all-users');
        return response?.data
    } catch (err) {
        const errMsg = err?.response?.data
        console.error("Error during fetching users", errMsg)
        return errMsg
    }
}



export { signup, login, forgotPassword, resetPassword, deleteAccount, userInfo, allUsers }

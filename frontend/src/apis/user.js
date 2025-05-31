import clientApis from './index'

const signup = async (data) => {
    try {
        const response = await clientApis.post('/user/sign-up', data);
        return response.data
    }
    catch (error) {
        console.error("Error during singup", error)
        return error?.response?.data
    }
}

const login = async (data) => {
    try {
        const response = await clientApis.post('/user/login', data);
        return response.data
    }
    catch (error) {
        console.error("Error during login", error?.response?.data)
        return error?.response?.message
    }
};

const forgotPassword = async (data) => {
    try {
        const response = await clientApis.post('/user/forgot-password', data);
        if (response?.data) {
            return response.data
        } else {
            return response
        }
    } catch (err) {
        console.error("Error during forgot password", err.response)
        return err.response.data
    }
};

const resetPassword = async (data) => {
    try {
        const response = await clientApis.post('/user/reset-password', data);
        if (response?.data) {
            return res.data
        } else {
            return response
        }
    } catch (err) {
        console.error("Error during reset password", err.response)
        return err.response.data
    }
};

const deleteAccount = async (id) => {
    try {
        const response = await clientApis.delete('/user/delete-account');
        return response?.data
    } catch (err) {
        console.error("Error during delete account", err.response)
        return err.response.data
    }
}



export default { signup, login, forgotPassword, resetPassword, deleteAccount }

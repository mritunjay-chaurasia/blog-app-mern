import CustomButton from '../../../components/CustomButton';
import InputTextField from '../../../components/TextFields';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { showToast } from '../../../utils/notification';
import { forgotPassword } from '../../../apis/user';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || email.trim() === "") {
            showToast("error", "Email is required!")
            return
        }

        const response = await forgotPassword(email);
        if (response?.success) {
            showToast("success", response.message)
            window.open(response.resetUrl, '_blank');
        } else {
            showToast("error", response?.message)
        }
    }

    return (
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", }}>
            <Box className='p-5' style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "550px", gap: "15px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,.1)" }}>
                <h2>Forgot Password</h2>
                <InputTextField name={'email'} value={email} handleOnChange={(e) => setEmail(e.target.value)} label={"Email Address"} />
                <CustomButton
                    label={"Send Email"}
                    isLoading={false}
                    color={"#fff"}
                    background={"hsl(220, 30%, 6%)"}
                    height={"40px"}
                    width={"100%"}
                    type={"submit"}
                    borderRadius={"12px"}
                    handleSubmit={handleSubmit}
                    disabled={false}
                />
            </Box>
        </Box>
    )
}

export default ForgotPassword
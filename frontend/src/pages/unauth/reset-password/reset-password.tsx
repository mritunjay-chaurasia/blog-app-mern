import CustomButton from '../../../components/CustomButton';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { showToast } from '../../../utils/notification';
import { resetPassword } from '../../../apis/user';
import { useNavigate, useParams } from 'react-router-dom';
import PasswordField from '../../../components/PasswordField';
import DisplayErrorMessage from '../../../components/DisplayErrorMessage';

const ResetPassword = () => {
    const { resetToken } = useParams();
    const [credential, setCredential] = useState({
        password: "",
        confirmPassword: "",
        token: resetToken
    });


    const [errorsMsg, setErrorsMsg] = useState({
        password: "",
        confirmPassword: "",
    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Password
        if (!credential.password) {
            setErrorsMsg((prev) => ({ ...prev, password: "Password is required." }))
            return
        } else if (credential.password.length < 6) {
            setErrorsMsg((prev) => ({ ...prev, password: "Password must be at least 6 characters." }))
            return
        } else {
            setErrorsMsg((prev) => ({ ...prev, password: "" }))
        }
        // Confirm Password
        if (!credential.confirmPassword) {
            setErrorsMsg((prev) => ({ ...prev, confirmPassword: "Please confirm your password." }))
            return
        } else if (credential.password !== credential.confirmPassword) {
            setErrorsMsg((prev) => ({ ...prev, confirmPassword: "Passwords do not match." }))
            return
        } else {
            setErrorsMsg((prev) => ({ ...prev, confirmPassword: "" }))
        }

        const response = await resetPassword(credential);
        if (response?.success) {
            showToast("success", response.message)
            navigate('/')
        } else {
            showToast("error", response?.message)
        }
    }

    return (
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", }}>
            <Box className='p-5' style={{ display: "flex", alignItems: "center", justifyContent: "start", flexDirection: "column", width: "550px", gap: "15px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,.1)" }}>
                <h2>Reset Password</h2>
                <PasswordField handleOnChange={(e) => setCredential((prev) => ({ ...prev, password: e.target.value }))} name={'password'} label={"Password"} />
                {errorsMsg?.password && <DisplayErrorMessage msg={errorsMsg?.password} />}

                <PasswordField handleOnChange={(e) => setCredential((prev) => ({ ...prev, confirmPassword: e.target.value }))} name={'confirmPassword'} label={"Confirm Password"} />
                {errorsMsg?.confirmPassword && <DisplayErrorMessage msg={errorsMsg?.confirmPassword} />}

                <CustomButton
                    label={"Update Password"}
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

export default ResetPassword;

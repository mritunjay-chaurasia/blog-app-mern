import CustomButton from '../../../components/CustomButton';
import InputTextField from '../../../components/TextFields';
import PasswordField from '../../../components/PasswordField';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link, Divider, Typography, Checkbox } from '@mui/material';
import { useState } from 'react';
import { showToast } from '../../../utils/notification';
import { login } from '../../../apis/user.api';
import { useNavigate } from 'react-router-dom';
import { access_token } from '../../../constant';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = loginInfo
        if (!email && !password) {
            showToast("error", "Email and  Password is required!")
            return
        } else if (email.trim() === "") {
            showToast("error", "Email is required!")
            return
        } else if (password.trim() === "") {
            showToast("error", " Password is required!")
            return
        }
        const response = await login(loginInfo)
        if (response?.success) {
            showToast("success", response.message)
            localStorage.setItem(access_token, response?.token)
            navigate('/dashboard')
        } else {
            showToast("error", response?.message)
        }
    }

    return (
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", }}>
            <div className='p-5' style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "550px", gap: "15px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,.1)" }}>
                <h2>Sign in</h2>
                <InputTextField name={'email'} value={loginInfo.email} handleOnChange={handleOnChange} label={"Email Address"} />
                <PasswordField name={'password'} handleOnChange={handleOnChange} label={"Password"} />
                <FormGroup sx={{ width: '100%' }}>
                    <FormControlLabel control={<Checkbox />} label="Remember me" />
                </FormGroup>
                <CustomButton
                    label={"Sign in"}
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
                <Link href="/forgot-password" color="secondary">
                    Forgot your password?
                </Link>
                <Divider
                    sx={{
                        width: '100%',
                    }}
                >
                    or
                </Divider>
                <CustomButton
                    label={"Sign in with Google"}
                    isLoading={false}
                    color={"black"}
                    background={"hsl(210deg 35.25% 85.18% / 90%)"}
                    height={"40px"}
                    width={"100%"}
                    type={"submit"}
                    borderRadius={"12px"}
                    handleSubmit={handleSubmit}
                    disabled={true}

                />
                <CustomButton
                    label={"Sign in with Facebook"}
                    isLoading={false}
                    color={"black"}
                    background={"hsl(210deg 35.25% 85.18% / 90%)"}
                    height={"40px"}
                    width={"100%"}
                    type={"submit"}
                    borderRadius={"12px"}
                    handleSubmit={handleSubmit}
                    disabled={true}

                />
                <Typography>Don't have an account?{" "}<Link href="signup" color="secondary">
                    Sign up
                </Link></Typography>


            </div>
        </Box>
    )
}

export default LoginPage
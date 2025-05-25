import * as React from 'react';
import CustomButton from '../../../components/CustomButton';
import InputTextField from '../../../components/TextFields';
import PasswordField from '../../../components/PasswordField';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link, Divider, Typography, Checkbox } from '@mui/material';

const LoginPage = () => {
    return (
        <Box sx={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", }}>
            <div className='p-5' style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "550px", gap: "15px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,.1)" }}>
                <h1>Sign in</h1>
                <InputTextField />
                <PasswordField />
                <FormGroup sx={{width: '100%' }}>
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
                />
                <Link href="#" color="inherit">
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
                />
                <Typography>Don't have an account?  <Link href="#" color="inherit">
                    Sign up
                </Link></Typography>


            </div>
        </Box>
    )
}

export default LoginPage
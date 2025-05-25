import * as React from 'react';
import CustomButton from '../../../components/CustomButton';
import InputTextField from '../../../components/TextFields';
import PasswordField from '../../../components/PasswordField';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link, Divider, Typography, Checkbox } from '@mui/material';

const SignupPage = () => {
    return (
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", }}>
            <div className='p-5' style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "550px", gap: "15px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,.1)" }}>
                <h2>Sign up</h2>
                <InputTextField label={"Name"} />
                <InputTextField label={"Email"} />
                <PasswordField />
                <FormGroup sx={{ width: '100%' }}>
                    <FormControlLabel control={<Checkbox />} label="I want to receive updates via email." />
                </FormGroup>
                <CustomButton
                    label={"Sign up"}
                    isLoading={false}
                    color={"#fff"}
                    background={"hsl(220, 30%, 6%)"}
                    height={"40px"}
                    width={"100%"}
                    type={"submit"}
                    borderRadius={"12px"}
                />

                <Divider
                    sx={{
                        width: '100%',
                    }}
                >
                    or
                </Divider>
                <CustomButton
                    label={"Sign up with Google"}
                    isLoading={false}
                    color={"black"}
                    background={"hsl(210deg 35.25% 85.18% / 90%)"}
                    height={"40px"}
                    width={"100%"}
                    type={"submit"}
                    borderRadius={"12px"}
                />
                <CustomButton
                    label={"Sign up with Facebook"}
                    isLoading={false}
                    color={"black"}
                    background={"hsl(210deg 35.25% 85.18% / 90%)"}
                    height={"40px"}
                    width={"100%"}
                    type={"submit"}
                    borderRadius={"12px"}
                />
                <Typography>Already have an account?{" "}
                    <Link href="#" color="inherit">
                        Sign in
                    </Link></Typography>


            </div>
        </Box>
    )
}

export default SignupPage
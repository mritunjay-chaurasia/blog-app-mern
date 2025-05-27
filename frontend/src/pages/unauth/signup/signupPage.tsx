import * as React from 'react';
import CustomButton from '../../../components/CustomButton';
import InputTextField from '../../../components/TextFields';
import PasswordField from '../../../components/PasswordField';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link, Divider, Typography, Checkbox, InputLabel } from '@mui/material';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const SignupPage = () => {
    const [phone, setphone] = React.useState('')

    return (
        <Box className="my-4" sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", }}>
            <div className='p-5' style={{ display: "flex", alignItems: "start", flexDirection: "column", width: "550px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,.1)" }}>
                <Typography variant='h4' sx={{ width: "100%", textAlign: "center" }}>Sign up</Typography>
                <InputLabel className='my-2' sx={{ textAlign: "start" }}>Full Name</InputLabel>
                <InputTextField label={"Full Name"} />
                <InputLabel className='my-2' sx={{ textAlign: "start" }}>Email</InputLabel>
                <InputTextField label={"Email"} />

                <InputLabel className='mt-2' sx={{ textAlign: "start" }}>Gender</InputLabel>
                <FormGroup sx={{ width: '100%', display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Male" />
                    <FormControlLabel control={<Checkbox />} label="Female" />
                    <FormControlLabel control={<Checkbox />} label="Other" />
                </FormGroup>

                <InputLabel className='my-2' sx={{ textAlign: "start" }}>Password</InputLabel>
                <PasswordField label={"Password"} />
                <InputLabel className='my-2' sx={{ textAlign: "start" }}>Confirm Password</InputLabel>
                <PasswordField label={"Confirm Password"} />

                <InputLabel className='my-2' sx={{ textAlign: "start" }}>Phone</InputLabel>
                <PhoneInput
                    inputStyle={{ height: '3.5rem', width: "100%" }}
                    country={'us'}
                    value={phone}
                    onChange={phone => setphone(phone)}
                />

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
                <Box sx={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",gap:"15px"}}>
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
                </Box>

                <Typography className='w-100 text-center my-2'>Already have an account?{" "}
                    <Link href="/login" color="inherit">
                        Sign in
                    </Link></Typography>


            </div>
        </Box>
    )
}

export default SignupPage
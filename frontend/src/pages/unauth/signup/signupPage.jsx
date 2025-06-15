import CustomButton from '../../../components/CustomButton';
import InputTextField from '../../../components/TextFields';
import PasswordField from '../../../components/PasswordField';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link, Divider, Typography, Checkbox, InputLabel, FormLabel, FormControl, RadioGroup, Radio } from '@mui/material';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useState } from 'react';
import { useValidateMessage } from '../../../customHooks/useValidateMsg';
import DisplayErrorMessage from '../../../components/DisplayErrorMessage';
import { signup } from '../../../apis/user';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../../utils/notification';
import { access_token } from '../../../constant';
import { GoogleLogin } from 'react-google-login';
import { socket } from '../../../../socket';
const clientId = 'YOUR_CLIENT_ID.apps.googleusercontent.com';


const SignupPage = () => {
    const temp = {
        fullName: "",
        email: "",
        gender: "",
        password: "",
        confirmPassword: "",
        phone: "",
        isUpdateEmail: false
    }
    const [errorsMsg, setErrorsMsg] = useState(temp)
    const [userInfo, setUserInfo] = useState(temp)
    const { errors } = useValidateMessage(userInfo)
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setUserInfo((prev) => ({ ...prev, [name]: value }))
    }

    function googleAuthentication() {
        console.log("inside googleAuthentication:::::::::")

    }

    const fbAuthentication = () => {
        console.log("inside fbAuthentication:::::::::")

    }

    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
    };
    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    };


    const handleSubmit = async (e, type) => {
        e.preventDefault()
        switch (type) {
            case "googleAuth":
                googleAuthentication()
                break;
            case "fbAuth":
                fbAuthentication()
                break;
            default:
                simpleAuthentication()
        }
    }

    async function simpleAuthentication() {
        if (Object.keys(errors).length > 0) {
            setErrorsMsg(errors)
            return
        }
        // delete userInfo.confirmPassword
        const response = await signup(userInfo);
        if (response?.success) {
            showToast("success", response.message)
            console.log("Response::::::",response.users[0]._id)
            socket.emit("joinMyRoom", response.users[0]._id);
            localStorage.setItem(access_token, response?.token)
            navigate('/dashboard')
        } else {
            showToast("error", response?.message)
        }
    }


    return (
        <Box className="my-4" sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", }}>
            <div className='p-5' style={{ display: "flex", alignItems: "start", flexDirection: "column", width: "550px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,.1)" }}>
                <Typography variant='h4' sx={{ width: "100%", textAlign: "center" }}>Sign up</Typography>
                <InputLabel className='my-2' sx={{ textAlign: "start" }}>Full Name</InputLabel>
                <InputTextField value={userInfo.fullName} name={"fullName"} handleOnChange={handleOnChange} label={"Full Name"} />
                {errorsMsg?.fullName && <DisplayErrorMessage msg={errorsMsg?.fullName} />}

                <InputLabel className='my-2' sx={{ textAlign: "start" }}>Email</InputLabel>
                <InputTextField value={userInfo.email} name={"email"} handleOnChange={handleOnChange} label={"Email"} />
                {errorsMsg?.email && <DisplayErrorMessage msg={errorsMsg?.email} />}

                <FormControl className='mt-2'>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onClick={handleOnChange}
                    >
                        <FormControlLabel name='gender' value="female" control={<Radio />} label="Female" />
                        <FormControlLabel name='gender' value="male" control={<Radio />} label="Male" />
                        <FormControlLabel name='gender' value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                    {errorsMsg?.gender && <DisplayErrorMessage msg={errorsMsg?.gender} />}

                </FormControl>

                <InputLabel className='my-2' sx={{ textAlign: "start" }}>Password</InputLabel>
                <PasswordField handleOnChange={handleOnChange} name={'password'} label={"Password"} />
                {errorsMsg?.password && <DisplayErrorMessage msg={errorsMsg?.password} />}


                <InputLabel className='my-2' sx={{ textAlign: "start" }}>Confirm Password</InputLabel>
                <PasswordField handleOnChange={handleOnChange} name={'confirmPassword'} label={"Confirm Password"} />
                {errorsMsg?.confirmPassword && <DisplayErrorMessage msg={errorsMsg?.confirmPassword} />}

                <InputLabel className='my-2' sx={{ textAlign: "start" }}>Phone</InputLabel>
                <PhoneInput
                    inputStyle={{ height: '3.5rem', width: "100%" }}
                    country={'us'}
                    value={userInfo.phone}
                    onChange={phone => setUserInfo(pre => ({ ...pre, phone }))}
                />
                {errorsMsg?.phone && <DisplayErrorMessage msg={errorsMsg?.phone} />}

                <FormGroup sx={{ width: '100%' }}>
                    <FormControlLabel control={<Checkbox name='isUpdateEmail' checked={userInfo.isUpdateEmail}
                        onChange={(e) => setUserInfo(prv => ({ ...prv, isUpdateEmail: e.target.checked }))}
                    />} label="I want to receive updates via email." />
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
                    handleSubmit={(e) => handleSubmit(e)}
                    disabled={false}

                />
                <Divider
                    sx={{
                        width: '100%',
                    }}
                >
                    or
                </Divider>

                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: "15px" }}>
                    {/* <CustomButton
                        label={"Sign up with Google"}
                        isLoading={false}
                        color={"black"}
                        background={"hsl(210deg 35.25% 85.18% / 90%)"}
                        height={"40px"}
                        width={"100%"}
                        type={"submit"}
                        borderRadius={"12px"}
                        handleSubmit={(e) => handleSubmit(e, "googleAuth")}
                        disabled={false}
                    /> */}


                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Login"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        style={{ marginTop: '100px' }}
                        isSignedIn={true}
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
                        handleSubmit={(e) => handleSubmit(e, "fbAuth")}
                        disabled={false}
                    />
                </Box>

                <Typography className='w-100 text-center my-2'>Already have an account?{" "}
                    <Link href="/login" color="secondary">
                        Sign in
                    </Link></Typography>


            </div>
        </Box>
    )
}

export default SignupPage
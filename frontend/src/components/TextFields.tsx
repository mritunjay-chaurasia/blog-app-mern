import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


const InputTextField = () => {
    return (
        <FormControl sx={{width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <TextField id="outlined-basic" label="Email" />
        </FormControl>
    )
}

export default InputTextField
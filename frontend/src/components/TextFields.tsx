import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


const InputTextField = ({label}) => {
    return (
        <FormControl sx={{width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">{label}</InputLabel>
            <TextField id="outlined-basic" label={label} />
        </FormControl>
    )
}

export default InputTextField
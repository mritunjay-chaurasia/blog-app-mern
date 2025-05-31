import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


const InputTextField = ({ value, name, label, handleOnChange }) => {
    return (
        <FormControl sx={{ width: '100%' }} variant="outlined">
            <TextField value={value} name={name} id="outlined-basic" label={label} onChange={handleOnChange} />
        </FormControl>
    )
}

export default InputTextField
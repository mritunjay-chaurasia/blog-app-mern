import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


const InputTextField = ({label}) => {
    return (
        <FormControl sx={{width: '100%' }} variant="outlined">
            <TextField id="outlined-basic" label={label} />
        </FormControl>
    )
}

export default InputTextField
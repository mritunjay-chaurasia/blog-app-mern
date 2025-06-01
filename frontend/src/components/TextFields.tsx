import * as React from 'react';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const InputTextField = ({ value, name, label, handleOnChange }) => {
    return (
        <FormControl sx={{ width: '100%' }} variant="outlined">
            <TextField
                value={value}
                name={name}
                id={name}
                label={label}
                onChange={handleOnChange}
                placeholder={label}
                slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start">{name === 'email' ? <EmailIcon /> : <AccountCircleIcon />}</InputAdornment>,
                    },
                }}

            />
        </FormControl>
    )
}

export default InputTextField
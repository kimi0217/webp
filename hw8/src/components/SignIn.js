import React from 'react';
import './SignIn.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const SignIn = () => {
    return (
        <div id='all'>
            <p>Sign in CSIE@CGU</p>

            <TextField label = "Email"></TextField>
            <br/><br/>
            <TextField label = "Password"></TextField>
            <br/><br/>
            <Button id='signin'>SIGN IN</Button>
        </div>
    );
}
 
export default SignIn;
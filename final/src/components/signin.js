import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { auth, db } from '../fb/firebase';
import { useNavigate } from 'react-router-dom';

const { useState } = React;
const Signin = () => {
    const navigate = useNavigate();
    const [sign, setsign] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        if (sign) {
            auth
                .createUserWithEmailAndPassword(data.get('email'), data.get('password'))
                .then(() => {
                    return auth.currentUser.updateProfile({
                        displayName: username,
                    })
                })
                .then(() => {
                    db.collection('users').doc(username).set({
                        follower:0,
                        followering:0,
                        posts:0,
                        introduce:"",
                        name:"",
                    });
                    navigate('/Home');
                })
                .catch((error) => alert(error.message));
        } else {
            auth
                .signInWithEmailAndPassword(data.get('email'), data.get('password'))
                .then(() => {
                    navigate('/Home')
                })
                .catch((error) => alert(error.message));
        }

    };
    return (
        <Box
            sx={{
                margin: 'auto',
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '500px',
                height: '425px',
                bgcolor: '#FAF0E6',
                borderColor: 'text.primary',
                border: 1,
            }}
        >
            {sign ? (<Typography variant="p" sx={{ mt: 2 }}>
                <LoginRoundedIcon sx={{ fontSize: 20, pt: 1, margin: '10px', mr: 2 }} />Create your own account
            </Typography>) : (<Typography variant="p" sx={{ mt: 2 }}>
                <LoginRoundedIcon sx={{ fontSize: 20, pt: 1, margin: '10px', mr: 2 }} />Log in
            </Typography>)}
            <Box component="form" noValidate sx={{ mt: 3, ml: 2, mr: 2 }} onSubmit={handleSubmit}>
                <Grid container>
                    {sign ? (<Grid item xs={12} sx={{ mb: 2 }}>
                        <TextField
                            required
                            fullWidth
                            id="username"
                            label="Create your User Name"
                            name="username"
                            autoComplete="username"
                        />
                    </Grid>) : (<></>)}
                    <Grid item xs={12} >
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Input your Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Input your Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 2, mb: 2, color: 'black', borderColor: 'black' }}
                >
                    {sign ? (<Typography>Create your own account</Typography>) : (<Typography>Log in</Typography>)}
                </Button>
                <Grid container justifyContent="flex-end" sx={{ top: '10%' }}>
                    <Grid item>
                        <Button variant="text" onClick={() => setsign(!sign)}>{sign ? (<Typography variant='body1'>Log in</Typography>) : (<Typography variant='body1'>Create your own account</Typography>)}</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
export default Signin
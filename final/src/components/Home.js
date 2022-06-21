import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Post from './post';
import Edit from './edit';
import Grid from '@mui/material/Grid';
import { db, auth } from '../fb/firebase';
import '@fontsource/roboto/400.css';
const { useState, useEffect } = React;
const Personalpage = () => {
    const [user, setuser] = useState('');
    const [posts, setposts] = useState([]);
    const [photo, setphoto] = useState('');
    useEffect(() => {
        db.collection('users').doc(auth.currentUser.displayName).onSnapshot(doc => { setuser(doc.data()) });
        setphoto(auth.currentUser.photoURL);
        db.collection('posts').where('username', '==', `${auth.currentUser.displayName}`).orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setposts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })));
        });

    }, []);
    return (
        <Box>
            <Container sx={{ width: 750, height: 200,  borderLeft: 1, borderRight: 1, borderTop: 1, borderBottom: 1,  borderColor: 'black', marginTop:'20px', bgcolor: '#FAF0E6' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid xs={4} sx={{ mt: 2 }}>
                            <Avatar alt="" src={photo} sx={{ width: 50, height: 50, ml: 17, mt: 4.5 }} />
                        </Grid>
                        <Grid xs={8} sx={{ textAlign: 'center', mt: 6 }}>
                            <Stack direction="row" spacing={1} sx={{ mt: 3, ml: 0 }}
                                divider={<Divider orientation="vertical" flexItem />}>
                                <Typography variant="p" sx={{ width: 120 }}>Posts : {posts.length}</Typography>
                                <Typography variant="p" sx={{ width: 120 }}>Fans : {user.follower}</Typography>
                                <Typography variant="p" sx={{ width: 120 }}>Followering : {user.followering}</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Typography variant='p' sx={{ ml: 5, mt: 2 }}>{user.name}</Typography>
                    <Typography variant="subtitle1" sx={{ ml: 5 }}>{user.introduce}</Typography>
                    <Edit photo={photo} introduce={user.introduce} name={user.name} />
                </Box >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        mr:5,
                        ml:5
                    }}
                >
                    {
                        posts.map(({ id, post }) => (
                            <Post key={id} postId={id} username={post.username} text={post.text} imgurl={post.imgurl} userphoto={post.userphoto} />
                        ))
                    }
                </Box>
            </Container >
        </Box>
    )
};
export default Personalpage;











import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Favorite from '@mui/icons-material/Favorite';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { auth, db } from '../fb/firebase';
import firebase from 'firebase';
import { height } from '@mui/system';
import { blue } from '@mui/material/colors';
const { useState, useEffect } = React;
const Post = ({ postId, username, text, imgurl, userphoto }) => {
    const [likes, setlikes] = useState([]);
    const [haslike, sethaslike] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [hidden, sethidden] = useState(true);
    const user = auth.currentUser;
    useEffect(() => {
        db.collection('posts').doc(postId)
            .collection("likes").onSnapshot(snapshot => {
                setlikes(snapshot.docs)
            })
        return () => {
        };
    }, [postId]);
    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                })
        }
        return () => {
            unsubscribe();
        };
    }, [postId]);

    useEffect(
        () =>
            sethaslike(
                likes.findIndex((like) => like.id === user?.displayName) !== -1
            ),
        [likes]);

    const islike = () => {
        if (haslike) {
            db.collection("posts").doc(postId).collection("likes").doc(user.displayName).delete();
        } else {
            db.collection("posts").doc(postId).collection("likes").doc(user.displayName).set({
                username: user.displayName,
            });
        }
    };

    const postcomment = () => {
        db.collection("posts").doc(postId).collection("comments").add({
            comment: comment,
            username: user.displayName,
            userimg: user.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    return (
        <Box sx={{ bgcolor: 'red.300', marginTop:'30px'}}>
            <div style={{ display: 'flex', alignItems: 'center', paddingTop: 20, paddingBottom: 20 }}>
                <Avatar
                    alt=''
                    src={userphoto}
                    sx={{ width: 30, height: 30 }}
                />
                <Typography variant='p' sx={{ ml: 1 }}>{username}</Typography>
            </div>
            <img alt="" src={imgurl} style={{ width: '50%', objectFit: 'contain' }} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}

            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {
                        haslike?(
                            <Favorite color="error" sx={{ width: 20, height: 20, mt:0.5, mr:0.5 }}  onClick={islike}/>
                        ):(
                            <FavoriteBorder sx={{ width: 20, height: 20, mt:0.5, mr:0.5 }}  onClick={islike}/>
                        )
                    }
                    <Typography variant='p' sx={{ pt: 0.5 }}>{likes.length}</Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 20 }}>
                    <IconButton aria-label="message">
                        <SendRoundedIcon sx={{ width: 20, height: 20, mt:0.5 }} onClick={() => { sethidden(!hidden) }} />
                    </IconButton>
                    <Typography variant='p' sx={{ pt: 0.5 }}>{comments.length}</Typography>
                </div>
            </Box>
            <Typography variant='p' sx={{ wordWrap: 'break-word', ml: 1, mr: 2}}>{text}</Typography>
            <Box sx={{ ml:3, mt: 2 }} hidden={hidden}>
                {comments.map((comment) => (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 2 }}>
                            <Avatar
                                alt=''
                                src={user.photoURL}
                                sx={{ width: 20, height: 20, mr:1, color:'#4798b3' }}
                            />
                            <Typography variant='p' sx={{}}>{comment.username}</Typography>
                        </div>

                        <Typography variant='p' sx={{ ml: 3.5, color:'#4798b3' }}>{comment.comment}</Typography >
                    </div>
                ))}
            </Box>
            <TextField
                id="comment"
                name="comment"
                label=""
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth="50%"
                placeholder="Send a message"
                InputProps={{
                    endAdornment: (
                        <IconButton disable={!comment} type="submit" onClick={postcomment}>
                            <SendRoundedIcon />
                        </IconButton>
                    ),
                }}
                variant="standard"
            />
        </Box>
    );
};

export default Post
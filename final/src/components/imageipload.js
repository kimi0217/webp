import * as React from 'react';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { storage, db } from '../fb/firebase';
import firebase from 'firebase';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
const { useState } = React;
const Input = styled('input')({
    display: 'none',
});
const Imageupload = ({ username , userphoto}) => {
    const [open, setOpen] = useState(false);
    const [image, setimage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [text, settext] = useState('');
    const navigate = useNavigate();
    const handlechange = (e) => {
        console.log('files: ', e.target.files);
        if (e.target.files[0]) {
            setimage(e.target.files[0]);
        }
    };
    const preview = image
    const handleupload = () => {
        const uploadtask = storage.ref(`images/${image.name}`).put(image);
        uploadtask.on(
            "state_changed",
            () => {
                if (!loading)
                    setLoading(true);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            text: text,
                            imgurl: url,
                            username: username,
                            userphoto: userphoto,
                            like: 0,
                        });
                        setLoading(false);
                        settext("");
                        setimage(null);
                        setOpen(false);
                    })
                    .then(() => {
                        navigate('/posts');
                    })
            }
        )
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <IconButton sx={{ width: 85, height: 85 }} aria-label="add" onClick={handleClickOpen}>
                <AddBoxRoundedIcon sx={{ fontSize: 30, mb: 1 }} />
            </IconButton>
            <Dialog open={open} onClose={handleClose} fullWidth='md'>
                <DialogTitle>Add a new post!</DialogTitle>
                <Box component="img" noValidat src={preview}></Box>
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={handlechange} />
                    <IconButton sx={{ width: 70, height: 70 }} aria-label="upload picture" component="span"  >
                        <AddPhotoAlternateRoundedIcon sx={{ fontSize: 20, ml: 2}} />
                    </IconButton>
                </label>
                <DialogContent>
                    <TextField
                        id="standard-multiline-flexible"
                        label=""
                        fullWidth
                        multiline
                        maxRows={4}
                        value={text}
                        placeholder="Add commentary"
                        onChange={event => settext(event.target.value)}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={loading} onClick={handleupload}>Upload</Button>{loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: 'general',
                                position: 'absolute',
                                left: '90%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default Imageupload
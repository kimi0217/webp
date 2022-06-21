import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {  auth, db, storage } from '../fb/firebase';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
const { useState } = React;
const Input = styled('input')({
    display: 'none',
});

const Edit = ({photo,introduce,name}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [newimage, setimage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newintroduce, setintroduce] = useState(introduce);
    const [newname, setname] = useState(name);

    const handlechange = (e) => {
        console.log('files: ', e.target.files);
        if (e.target.files[0]) {
            setimage(e.target.files[0]);
        }
    };
    const preview = newimage ? URL.createObjectURL(newimage) : photo;
    const handleupload = () => {
        const uploadtask = storage.ref(`users/${newimage.name}`).put(newimage);
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
                    .ref("users")
                    .child(newimage.name)
                    .getDownloadURL()
                    .then(url => {
                        auth.currentUser.updateProfile({
                            photoURL: url,
                        });
                        db.collection("users").doc(auth.currentUser.displayName).update({
                            introduce: newintroduce,
                            name: newname,
                        });
                        setLoading(false);
                        setOpen(false);
                    })
                    .then(() => {
                        navigate('/Home');
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
            <Button variant="outlined" sx={{ mt: 3,mb:1, ml: 0, color: 'black', borderColor: 'black', width: 700 }}>
                Edit your personal information
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth='md'>
                <DialogTitle>
                    Personal Information
                </DialogTitle>
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={handlechange} />
                    <IconButton sx={{ width: 150, height: 150, ml: 5, mt: 3 }} aria-label="upload picture" component="span"  >
                        <Avatar alt="" src={preview} sx={{ width: 150, height: 150 }} />
                    </IconButton>
                </label>
                <DialogContent>
                    <TextField
                        fullWidth
                        value={newname}
                        id="name"
                        label="Enter your Name"
                        name="name"
                        onChange={event => setname(event.target.value)}
                        sx={{
                            mt: 2,
                            mb: 3
                        }}
                    />
                    <TextField
                        id="standard-multiline-flexible"
                        label=""
                        fullWidth
                        multiline
                        maxRows={4}
                        value={newintroduce}
                        placeholder="Others about you"
                        onChange={event => setintroduce(event.target.value)}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={loading} onClick={handleupload}>Edit</Button>{loading && (
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
export default Edit;
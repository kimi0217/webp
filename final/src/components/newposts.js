import * as React from 'react';
import Post from './post';
import { db } from '../fb/firebase';

const { useState,useEffect} = React;
const Newpost = () => {
    const [posts, setposts] = useState([]);
    useEffect(() => {
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
            setposts(snapshot.docs.map(doc=>({
                id:doc.id,
                post:doc.data()
            })));
        })
        return () => {
        };
    }, []);
};
export default Newpost
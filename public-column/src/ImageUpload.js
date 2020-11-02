import React, { useEffect, useState } from 'react'
import {Button, makeStyles, Modal} from "@material-ui/core";
import {storage,db} from "./firebase";
import firebase from "firebase";
import './ImageUpload.css';


function getModalStyle() {
    const top = 50
    const left = 50
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 800,
      backgroundColor: '#A3EBDF',
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function ImageUpload(username) {

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const classes = useStyles()


    const [caption , setCaption] = useState('');
    const [progress , setProgress] =useState(0);
    const [image,setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
                }
    };

    const handleUpload = (e) => {
       const uploadTask = storage.ref(`images/${image.name}`).put(image);
       uploadTask.on(
           "state_changed",
           (snapshot) => {
               const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setProgress(progress);
           },
           (error) => {
               console.log(error);
               alert(error.message);
           },
           () => {
               storage.ref("images")
               .child(image.name)
               .getDownloadURL()
               .then(url => {
                   db.collection("posts").add({
                       timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                       caption:caption,
                       imageUrl:url,
                       username:username
                   });
                   setProgress(0);
                   setCaption("");
                   setImage(null);
                   setOpen(false)
               });
           }
       )
    }


    return (

        <div className="upload">
        <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
      <div style={modalStyle} className={classes.paper}>
      <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100"/>
      <input type="text" placeholder="Enter a Caption" onChange={ event => setCaption(event.target.value)} value={caption}/>
      <input type="file" onChange={handleChange}/>
      <Button onClick={handleUpload}>
      Upload
      </Button>

   </div>
      </div>

      
      </Modal>

      <div className="upload__img">
              <img className="img__uploading" onClick={() => setOpen(true)} src="https://img.icons8.com/bubbles/2x/up.png"></img>
            </div>
     
        </div>
        
      
    );
}

export default ImageUpload

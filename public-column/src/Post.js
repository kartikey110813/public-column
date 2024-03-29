import React, { useState, useEffect} from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
import { db } from './firebase'
import firebase from 'firebase'
import Likes from './Likes'



function Post({ postId, user, username, imageUrl, caption}) {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('');
   
 

    useEffect(() => {
        let unsubscribe
        if (postId) {
            console.log(postId)
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => ({
                        com:doc.data(),
                        id:doc.id
                    })
                    ))
                    console.log(comments)
                })
        }

        return () => {
            unsubscribe()
        }

    }, [postId])

    const postComment = (event) => {
        event.preventDefault()

        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('')
    }



    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className='post__avatar'
                    alt={username.username}
                    src='static/images/avatar/1.jpg'
                />
                <h3>{username.username}</h3>
            </div>
            
            <img className="post__image" src={imageUrl} alt="" />
            
    {/* For like and unlike functionality */}
    
        <Likes/>

            <h4 className="post__text"> <strong>{username.username}</strong> {caption}</h4>

           {user && (
            <div className="post__comments">
            {comments.map((comment,id)=>(
                <p key={id}>
                    <strong>{comment.username}</strong> {comment.text}
                </p>
            ))}
        </div>
           )} 
            
            
            {user && (
                <form className='post__commentBox'>
                <input
                    className='post__input'
                    type="text"
                    placeholder='Add a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className='post__button'
                    disabled={!comment}
                    disabled={!user}
                    type='submit'
                    onClick={postComment}>Post</button>
            </form>
            
            )}

                
            
        </div>
    )
}

export default Post
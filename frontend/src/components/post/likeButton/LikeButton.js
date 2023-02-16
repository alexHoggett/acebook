import React from "react";
import { MdThumbUpOffAlt } from 'react-icons/md';
import './LikeButton.css';
const LikeButton = ({post, isLiked}) => {

  const handleClick = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/posts/like', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        post_id: post._id
      })
    })
    isLiked(true)
  }

  return( 
    <div>
      <button onClick={handleClick} className='footer-button like-button'><MdThumbUpOffAlt /></button>  
    </div>
  )
}
export default LikeButton;


import React, { useState, useEffect } from 'react';
import './Post.css';
import DeleteButtonPost from '../deleteButton/DeleteButtonPost';
import EditButton from '../editButton/EditButtonPost';
import LikeButton from '../likeButton/LikeButton';
import { FaRegUser } from 'react-icons/fa';

const Post = ({post}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(post);
  const [like, setLike] = useState(false)

    if (isEditing || like) {
      window.location.reload();
    }


  return isDeleted ? (
    <> </>
  ) : (
    <div className="post-container">
      <div className='post-header'>
        <div className='post-profile-picture'><FaRegUser /></div>
        <div className='post-name'>{post.user_id.firstName} {post.user_id.surname[0]}</div>
        <div className='post-date-time__container'>
          <div className='post-date'>{post.date_created.slice(0, 10)}</div>
          <div className="post-time">{post.date_created.slice(11, 16)}</div>
        </div>
      </div>
      <article data-cy="post" className='post-content' key={ post._id }>{ updatedPost.content }</article>

      <div className='post-footer'>
        <DeleteButtonPost post={post} id={post._id} setIsDeleted={setIsDeleted} /> 
        <EditButton post={post} onUpdate={setIsEditing}/>
        <LikeButton post={post} isLiked={setLike} />  
        <p className='footer-like-counter'>{post.likes.length}</p>
      </div>
    </div>
  );
};

export default Post;
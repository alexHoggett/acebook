import React from 'react';

const Post = ({post}) => {

  const handleDelete = async () =>{
    console.log(post._id)
    const token = window.localStorage.getItem("token")
    let response = await fetch(`/posts/${post._id}`, {
    
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(null) 
    })

    if(response.status !== 204) {
      console.log("bad request");

    } else {
      console.log("post was deleted")
      let data = response.json()
      window.localStorage.setItem("token", data.token);

    }
  }

  // const clicked = () => {
  
  //   return console.log("clicked!!!!")
  // }


  return(
    <div>
      <article data-cy="post" _id={ post._id }>{ post.message }{console.log(post)}</article>
      <button onClick={handleDelete}>Delete post</button>
    </div>
    
  )
}

export default Post;

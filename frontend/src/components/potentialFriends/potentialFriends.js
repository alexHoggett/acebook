import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import './potentialFriends.css';

const PotentialFriend = ({ potentialFriend, token }) => {
  const [friendRequest, setFriendRequest] = useState(false)

  const addFriend = async (pfid, token) => {
  
    // Sends a fetch request to users using the put method to update the user to include the potential friend's id into the user's friends list 
    let response = await fetch ('/users' ,{
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // This is the token header
      },
      body: JSON.stringify({ pfid: pfid, token: token})
    })
    // When a 201 is recieved it will log to the console that it was successful. Or that it wasn't if a 201 not recieved 
    if(response.status !== 201) {
      console.log("friend not updated sorry :(")
    } else {
      setFriendRequest(true)
      console.log("Friend added")
      let data = await response.json()
      window.localStorage.setItem("token", data.token);
    }
  }
    if(friendRequest == false){
      return(
        <div className="potential-friend">
          {/* ._id is unique identifier. First & surname passed through parent to child to be displayed via prop */}
          <article className="friend-details" data-cy="post" key={ potentialFriend._id }> {potentialFriend.firstName} {potentialFriend.surname}</article>
          <button className="add-friend-button" onClick={() => addFriend(potentialFriend._id, token)}>Add friend</button>
        </div>)
    } else {
      return (
        <div>
          <article className="friend-details" data-cy="post" key={ potentialFriend._id }> {potentialFriend.firstName} {potentialFriend.surname}</article>
          <p className="friend-added">Friend Added!</p>
        </div>
      )
    }
}

export default PotentialFriend;
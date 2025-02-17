import React from 'react';
import './Navbar.css';
// bananas


const Navbar = ({ navigate, signedIn }) => {
  

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate('/login');
  };

  const profile = () => {
   navigate('/profile');
  }


  return (
    <nav className="nav-container" data-cy="nav">
      <div className='logo'><a href="/posts"><img className='logo-img' src="logo-blue.png" /></a></div>
      <ul className="nav-list">

          { signedIn &&
            <li className='nav-item'><a href="/login" onClick={ logout }>Sign out</a></li>
          }
          { signedIn &&
            <li className='nav-item'><a href="/profile" onClick={ profile }>Profile</a></li>
          }          
          {
            signedIn &&
            <li className='nav-item'><a href="/users">Community</a></li>
          }
          {
            !signedIn &&
            <li className='nav-item'><a href="/login">Sign in</a></li>
          }
          {
            !signedIn &&
            <li className='nav-item'><a href="/signup">Register</a></li>
          }
      </ul>
    </nav>
  )
}



export default Navbar;

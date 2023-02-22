import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../Assets/Image/logo.png";
import "./Navbar.css";
import { useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";

const Navbar = () => {

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  console.log(user)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        setUser(user);
      } else {
        setUser({});
      }
    });
  }, []);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      // An error happened.
    })
  }


  return (
    <nav
      style={
        pathname.includes("blog") ? { display: "none" } : { display: "flex" }
      }
    >
      <Link to='/'>
        <div className='logo-container'>
          <img src={Logo} alt='' />
        </div>
      </Link>
      <div className='link-container'>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "link")}
          to='/'
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "link")}
          to='/videos'
        >
          Videos
        </NavLink>
        {
          user.uid ? <button style={{ cursor: 'pointer' }} className="logout-button" onClick={handleLogOut}>Logout</button> : <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "link")}
            to='/login'
          >
            Login
          </NavLink>
        }
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react'
import { NavLink } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import { LOGOUT_USER } from '../utils/mutations'


const Navbar = () => (

    <nav>
        <NavLink activeclassname="active" className="home-link" to="/">
          Home
        </NavLink>
        <NavLink activeclassname="active" className="contact-link" to="/contact">
          Contact
        </NavLink>
        <NavLink activeclassname="active" className="login-link" to="/login">
          Login
        </NavLink>
    </nav>
)


export default Navbar;


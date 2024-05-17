import React from 'react'
import './App.css';
//import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const Navbar = () => {
    
    return (
    <nav className ='navbar'>
        <div className ='navbar-siteTitle'>MajorView</div>
        <ul className ='navbar-menu'>
            <li className="navbar-item"><a href="/">Home</a></li>
        </ul>
    </nav>
    )
}


export default Navbar
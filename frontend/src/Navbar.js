import React from 'react'
//import React, { useState } from 'react';

function Navbar() {
    
    return (
    <div className='navbar'>
        <div className='navbar-siteTitle'>MajorView</div>
        <ul className='navbar-menu'>
            <li><a href = "/">Home</a></li>
            <li><a href = "/about">About</a></li>
            <li><a href = "/majorGraph">MajorGraph</a></li>
            <li><a href = "/personalGraph">PersonalGraph</a></li>
        </ul>
       

    </div>
    )
}

export default Navbar
import React from 'react'
import {Link} from "react-router-dom";

function Nav() {
    return (
        <nav className="nav-container">
            <Link to='/' className="nav-link">Home Page</Link>
            <Link to='/books' className="nav-link">Books</Link>
        </nav>
    );
}

export default Nav;
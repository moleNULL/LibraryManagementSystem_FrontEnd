import React from 'react'
import {Link} from "react-router-dom";
import {googleLogout} from "@react-oauth/google";
import {logout, selectIsLoggedIn} from "./authSlice";
import {useAppDispatch} from "../app/hooks";
import {useSelector} from "react-redux";

interface INavProps {
    showPagesForRegisteredUsers: boolean,
}

function Nav({showPagesForRegisteredUsers}: INavProps) {
    const dispatcher = useAppDispatch();
    function logOut() {
        googleLogout();
        window.localStorage.removeItem("jwt");
        window.localStorage.removeItem("jwtExpiration");
        dispatcher(logout());
    }

    return (
        <nav className="nav-container">
            <Link to='/' className="nav-link">Home Page</Link>
            {
                showPagesForRegisteredUsers &&
                <>
                    <Link to='/books' className="nav-link">Books</Link>
                    <Link to='/genres' className="nav-link">Genres</Link>
                    <Link to='/' className="nav-link align-right">
                        <button className="btn-change" onClick={logOut}>Log out</button>
                    </Link>
                </>
            }
        </nav>
    );
}

export default Nav;
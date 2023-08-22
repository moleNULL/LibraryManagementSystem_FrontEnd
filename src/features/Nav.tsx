import React from 'react'
import {Link} from "react-router-dom";
import {GoogleLogin, googleLogout} from "@react-oauth/google";
import {login, logout, selectIsLoggedIn} from "./auth/authSlice";
import {useAppDispatch} from "../app/hooks";
import {useSelector} from "react-redux";
import {extractUserFullNameFromJwt, getJwtExpirationTime, getJwtToken, removeJwtToken, setJwtToken} from "./utils/jwtHelpers";
import {AppDispatch} from "../app/store";

function Nav() {
    const dispatcher: AppDispatch = useAppDispatch();

    if (getJwtToken()) {
        const currentJwtExpirationTime: string | null = getJwtExpirationTime();

        if (currentJwtExpirationTime) {
            if (parseInt(currentJwtExpirationTime) < new Date().getTime()) {
                removeJwtToken();
            } else {
                const userFullName: string = extractUserFullNameFromJwt(getJwtToken()!);
                dispatcher(login(userFullName));
            }
        }
    }

    const isLoggedIn: boolean = useSelector(selectIsLoggedIn);

    const responseMessage = (response: any) => {
        const userFullName: string = extractUserFullNameFromJwt(response.credential);
        dispatcher(login(userFullName));

        console.log(response.credential);

        const expirationTime: number = new Date().getTime() + 3600 * 1000; // 1 hour in milliseconds
        setJwtToken(response.credential, expirationTime.toString());
    };

    const errorMessage = () => {
        console.log('Error occurred');
    };

    function logOut() {
        googleLogout();
        removeJwtToken();
        dispatcher(logout());
    }

    return (
        <nav className="nav-container">
            <Link to='/' className="nav-link">Home Page</Link>
            {
                isLoggedIn &&
                <>
                    <Link to='/books' className="nav-link">Books</Link>
                    <Link to='/genres' className="nav-link">Genres</Link>
                </>
            }
            <Link to='/' className="nav-link align-right">
                {
                    isLoggedIn
                        ? <button className="btn-change" onClick={logOut}>Log out</button>
                        : <GoogleLogin
                            onSuccess={responseMessage}
                            onError={errorMessage}
                            width="10px"
                            shape="circle"
                            theme="filled_blue"
                            />
                }
            </Link>
        </nav>
    );
}

export default Nav;
import React, {useEffect} from 'react'
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {GoogleLogin, googleLogout} from "@react-oauth/google";
import {
    login,
    logout,
    selectIsLoggedIn,
    selectIsPendingRegistration,
    serverLogIn
} from "./auth/authSlice";
import {useAppDispatch} from "../app/hooks";
import {useSelector} from "react-redux";
import {extractUserFullNameFromJwt, getJwtExpirationTime, getJwtToken, removeJwtToken, setJwtToken} from "./utils/jwtHelpers";
import {AppDispatch} from "../app/store";

function Nav() {
    const dispatcher: AppDispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();
    const isPendingRegistration: boolean | undefined = useSelector(selectIsPendingRegistration);

    useEffect(() => {
        if (isPendingRegistration === true) {
            navigate("/register");
        }
        else if (isPendingRegistration === false) {
            const token: string | null = getJwtToken();
            if (token) {
                const userFullName: string = extractUserFullNameFromJwt(token);
                dispatcher(login(userFullName));
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPendingRegistration]);

    if (getJwtToken()) {
        const currentJwtExpirationTime: string | null = getJwtExpirationTime();

        if (currentJwtExpirationTime) {
            if (parseInt(currentJwtExpirationTime) < new Date().getTime()) {
                removeJwtToken();
            } else {
                if (isPendingRegistration !== true) {
                    const userFullName: string = extractUserFullNameFromJwt(getJwtToken()!);
                    dispatcher(login(userFullName));
                }
            }
        }
    }

    const isLoggedIn: boolean = useSelector(selectIsLoggedIn);

    function responseMessage(response: any) : void {
        console.log(response.credential);

        const expirationTime: number = new Date().getTime() + 3600 * 1000; // 1 hour in milliseconds
        setJwtToken(response.credential, expirationTime.toString());

        dispatcher(serverLogIn());
    }

    function errorMessage() : void {
        console.log('Error occurred');
    }

    function logOut() : void {
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
                    isLoggedIn || isPendingRegistration
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
import React from 'react'
import {selectIsLoggedIn, selectIsServerResponseLoading, selectUserName} from "./auth/authSlice";
import {useSelector} from "react-redux";
import Spinner from "./Spinner";

function Home() {
    const isServerResponseLoading: boolean = useSelector(selectIsServerResponseLoading);
    const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
    const userName: string = useSelector(selectUserName);

    return (
        <>
            <h1>Home Page</h1>
            {
                isServerResponseLoading
                    ? <Spinner />
                    : isLoggedIn && <h1>Welcome to the library, {userName}!</h1>
            }
        </>
    );
}

export default Home;
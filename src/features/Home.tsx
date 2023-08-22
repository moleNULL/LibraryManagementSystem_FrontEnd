import React from 'react'
import {selectIsLoggedIn, selectUserName} from "./auth/authSlice";
import {useSelector} from "react-redux";

function Home() {
    const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
    const userName: string = useSelector(selectUserName);

    return (
        <>
            <h1>Home Page</h1>
            {
                isLoggedIn &&
                <h1>Welcome to the library, {userName}!</h1>
            }
        </>
    );
}

export default Home;
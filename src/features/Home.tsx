import React, {useEffect, useState} from 'react'
import jwt_decode from 'jwt-decode'
import {googleLogout} from "@react-oauth/google";
import {useAppDispatch} from "../app/hooks";
import {logout, selectIsLoggedIn, selectUserName} from "./authSlice";
import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";

function Home() {
    const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
    const userName: string = useSelector(selectUserName);
    /*const [user, setUser] = useState<string>('');
    function handleResponseCredential(response: any) : void {
        const userLoginData: any = jwt_decode(response.credential);

        setUser(userLoginData.name);

        document.getElementById('signInDiv')!.hidden = true;
    }

    function handleSignOut() : void {
        google.accounts.id.revoke(document.getElementById('signInDiv'), {});
        setUser('');
        document.getElementById('signInDiv')!.hidden = false;
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "461786025188-f0hs6dtdnqmj636r5t8r5ei26vqtn8mb.apps.googleusercontent.com",
            callback: handleResponseCredential
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {
                theme: "outline",
                size: "large"
            }
        );
    }, []);*/
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

/*
* <div id="signInDiv"></div>

            {
                user !== '' && <button onClick={handleSignOut}>Sign Out</button>
            }


            {
                user && <h1>Welcome to the Library, {user}</h1>
            }*/
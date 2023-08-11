import React from 'react';
import './App.css';
import BookList from "./features/book/BookList";
import Nav from "./features/Nav";
import Home from "./features/Home";
import {
    BrowserRouter,
    Routes,
    Route, Link, useNavigate
} from "react-router-dom";
import BookAdd from "./features/book/BookAdd";
import BookEdit from "./features/book/BookEdit";
import GenreList from "./features/genre/GenreList";
import Footer from "./features/Footer";
import {GoogleLogin} from "@react-oauth/google";
import {useSelector} from "react-redux";
import {login, selectIsLoggedIn, selectUserStatus} from "./features/authSlice";
import {useAppDispatch} from "./app/hooks";
import {AppDispatch} from "./app/store";
import jwt_decode from "jwt-decode";

function App() {
    const dispatcher: AppDispatch = useAppDispatch();
    const userStatus: string | null = useSelector(selectUserStatus);

    if (window.localStorage.getItem("jwt")) {
        const currentJwtExpirationTime: string | null = window.localStorage.getItem("jwtExpiration");

        if (currentJwtExpirationTime) {
            if (parseInt(currentJwtExpirationTime) < new Date().getTime()) {
                window.localStorage.removeItem("jwt");
            } else {
                const token: string | null = window.localStorage.getItem("jwt");
                const userLoginData: any = jwt_decode(token!);

                dispatcher(login(userLoginData.name));
            }
        }
    }

    const isLoggedIn: boolean = useSelector(selectIsLoggedIn);

    const responseMessage = (response: any) => {
        const userLoginData: any = jwt_decode(response.credential);
        dispatcher(login(userLoginData.name));

        console.log(response.credential);

        const expirationTime = new Date().getTime() + 3600 * 1000; // 1 hour in milliseconds
        window.localStorage.setItem("jwt", response.credential);
        window.localStorage.setItem("jwtExpiration", expirationTime.toString());
    };
    const errorMessage = () => {
        console.log('Error occurred');
    };

  return (
    <div>
        <BrowserRouter>
            <Nav showPagesForRegisteredUsers={isLoggedIn} />
            {
                !isLoggedIn &&
                <GoogleLogin
                    onSuccess={responseMessage}
                    onError={errorMessage}
                    useOneTap
                    width="10px"
                    shape="circle"
                    theme="filled_blue"
                    locale="uk_UA"
                />
            }
            <Routes>
                <Route path="/" element={<Home />} />
                {
                    isLoggedIn &&
                    <>
                        <Route path="/books">
                            <Route index element={<BookList />} />
                            {
                                userStatus === 'librarian' &&
                                <>
                                    <Route path="add" element={<BookAdd />} />
                                    <Route path=":id/edit" element={<BookEdit />} />
                                </>
                            }
                        </Route>
                        <Route path="/genres">
                            <Route index element={<GenreList />} />
                            {
                                userStatus === 'librarian' &&
                                <>
                                    <Route path="add" />
                                    <Route path="edit" />
                                </>
                            }
                        </Route>
                    </>
                }
            </Routes>
            <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;

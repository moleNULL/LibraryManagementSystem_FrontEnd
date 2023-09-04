import React, {useEffect} from 'react';
import './App.css';
import BookList from "./features/book/BookList";
import Nav from "./features/Nav";
import Home from "./features/Home";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import BookAdd from "./features/book/BookAdd";
import BookEdit from "./features/book/BookEdit";
import GenreList from "./features/genre/GenreList";
import Footer from "./features/Footer";
import {useSelector} from "react-redux";
import {selectIsLoggedIn, selectIsPendingRegistration, selectUserRole, serverLogIn} from "./features/auth/authSlice";
import Register from "./features/Register";
import PrivateRoute from "./utils/router/privateRoute";

function App() {
    const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
    const userRole: string | undefined = useSelector(selectUserRole);
    const isPendingRegistration: boolean | undefined = useSelector(selectIsPendingRegistration);

    return (
    <div>
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route element={<PrivateRoute isAllowed={isLoggedIn} redirectPath='/' />}>
                    <Route path="/books">
                        <Route index element={<BookList />} />
                        <Route element={<PrivateRoute isAllowed={isLoggedIn && userRole === 'librarian'} redirectPath='/books' />}>
                            <Route path="add" element={<BookAdd />} />
                            <Route path=":id/edit" element={<BookEdit />} />
                        </Route>
                    </Route>
                    <Route path="/genres">
                        <Route index element={<GenreList />} />
                        <Route element={<PrivateRoute isAllowed={isLoggedIn && userRole === 'librarian'} redirectPath='/genres' />}>
                            <Route path="add" />
                            <Route path=":id/edit" />
                        </Route>
                    </Route>

                </Route>

                <Route path="/" element={<Home />} />

                <Route
                    path="/register"
                    element={
                        <PrivateRoute isAllowed={!isLoggedIn && isPendingRegistration === true} redirectPath="/">
                            <Register />
                        </PrivateRoute>
                    }
                />
            </Routes>
            <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
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
import {selectIsLoggedIn, selectUserStatus} from "./features/auth/authSlice";

function App() {
    const userStatus: string | null = useSelector(selectUserStatus);
    const isLoggedIn: boolean = useSelector(selectIsLoggedIn);

  return (
    <div>
        <BrowserRouter>
            <Nav />
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

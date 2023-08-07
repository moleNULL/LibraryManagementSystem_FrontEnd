import React from 'react';
import './App.css';
import Book from "./features/book/Book";
import Nav from "./features/Nav";
import Home from "./features/Home";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import BookAdd from "./features/book/BookAdd";
import BookEdit from "./features/book/BookEdit";
import Genre from "./features/genre/Genre";
import Footer from "./features/Footer";

function App() {
  return (
    <div>
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books">
                    <Route index element={<Book />} />
                    <Route path="add" element={<BookAdd />} />
                    <Route path="edit" element={<BookEdit />} />
                </Route>
                <Route path="/genres">
                    <Route index element={<Genre />} />
                    <Route path="add" />
                    <Route path="edit" />
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;

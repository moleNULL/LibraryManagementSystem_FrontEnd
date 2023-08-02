import React from 'react';
import './App.css';
import Book from "./features/book/Book";
import Nav from "./features/Nav";
import Home from "./features/Home";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import BookAdd from "./features/book/BookAdd";
import BookEdit from "./features/book/BookEdit";
import BookDelete from "./features/book/BookDelete";

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
                    <Route path="delete" element={<BookDelete />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

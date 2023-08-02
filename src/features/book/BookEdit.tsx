import React, {useEffect, useRef, useState} from 'react'
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {getBooksAsync, IBook, postBooksAsync, removeBooks} from "./bookSlice";
import {getAuthorsAsync, IAuthor} from "../author/authorSlice";
import {Link} from "react-router-dom";

const initialFormData: IBook = {
    id: undefined,
    title: "",
    year: 0,
    description: "",
    authorId: 0,
    genreIds: [],
}


function BookEdit() {
    const dispatch = useAppDispatch();
    const books = useSelector((state: RootState) => state.books.items);
    const authors = useSelector((state: RootState) => state.authors.items);

    const genreIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const [formData, setFormData] = useState<IBook>(initialFormData);
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        if (books.length === 0) {
            dispatch(getBooksAsync());
        }

        if (authors.length === 0) {
            dispatch(getAuthorsAsync());
        }
    },[]);

    function getAuthorNameOrBookId(book: IBook): string | number {
        const author: IAuthor | undefined = authors.find(author => author.id === book.authorId);

        if (author) {
            return author.firstName + ' ' + author.lastName;
        }

        return book.id!;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) : void {
        e.preventDefault();

        dispatch(postBooksAsync(formData));

        if (formRef.current) {
            formRef.current.reset();
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) : void {
        const {name, value} = e.target;

        if (name === 'book.title') {
            setFormData(prevState => ({...prevState, title: value}));
        }

        if (name === 'book.year') {
            setFormData(prevState => ({...prevState, year: parseInt(value)}));
        }

        if (name === 'book.description') {
            if (value) {
                setFormData(prevState => ({...prevState, description: value}));
            }
        }

        if (name === 'selectAuthor') {
            setFormData(prevState => ({...prevState, authorId: parseInt(value)}));
        }
    }

    return (
        <div>
            <h1 className="center">Edit Books Page</h1>

            <div className="button-container">
                <Link to="/books/add"><input type="button" className="action-button" value="Add"/></Link>
                <Link to="/books/edit"><input type="button" className="action-button" value="Edit" disabled/></Link>
                <Link to="/books/delete"><input type="button" className="action-button" value="Delete"/></Link>
            </div>

            <form ref={formRef} onSubmit={handleSubmit}>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Description</th>
                    <th>Author</th>
                    <th>GenreIds</th>
                </tr>
                </thead>
                <tbody>
                {books.length > 0 ? (
                    books.map((book: any) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td><input type="text" name="book.title" value={book.title} onChange={handleChange} required/></td>
                            <td>{book.year}</td>
                            <td>{book.description}</td>
                            <td>{getAuthorNameOrBookId(book)}</td>
                            <td>[{book.genreIds.join(', ')}]</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6}>No books found</td>
                    </tr>
                )}
                </tbody>
            </table>

                <br />

                <div>
                    <input type="submit" className="btn-change" value="Add Category" />
                </div>
            </form>
        </div>
    );
}

export default BookEdit;
import React, {useEffect, useState} from 'react'
import {deleteBookAsync, getBooksAsync, IBook, removeBooks, updateBookAsync} from "./bookSlice";
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {getAuthorsAsync, IAuthor} from "../author/authorSlice";
import {Link} from "react-router-dom";
import {log} from "util";

interface IEditStatus {
    id: number|undefined,
    isEditable: boolean
}

const initialEditStatus: IEditStatus = {
    id: undefined,
    isEditable: true
};

const initialFieldsData: IBook = {
    id: undefined,
    title: "",
    year: 0,
    description: "",
    authorId: 0,
    genreIds: [],
}

function Book() {
    const dispatch = useAppDispatch();
    const books = useSelector((state: RootState) => state.books.items);
    const authors = useSelector((state: RootState) => state.authors.items);
    const genreIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const [editStatus, setEditMode] = useState<IEditStatus>(initialEditStatus);
    const [fieldsData, setFieldsData] = useState<IBook>(initialFieldsData);

    useEffect(() => {
        dispatch(getBooksAsync());
        dispatch(getAuthorsAsync());
    },[]);

    function refreshBooks() {
        dispatch(removeBooks());
        dispatch(getBooksAsync());
    }

    function getAuthorNameOrBookId(book: IBook): string | number {
        const author: IAuthor | undefined = authors.find(author => author.id === book.authorId);

        if (author) {
            return author.firstName + ' ' + author.lastName;
        }

        return book.id!;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) : void {
        const {name, value} = e.target;

        if (name === 'book.title') {
            setFieldsData(prevState => ({...prevState, title: value}));
        }

        if (name === 'book.year') {
            setFieldsData(prevState => ({...prevState, year: parseInt(value)}));
        }

        if (name === 'book.description') {
            if (value) {
                setFieldsData(prevState => ({...prevState, description: value}));
            }
        }

        if (name === 'selectAuthor') {
            setFieldsData(prevState => ({...prevState, authorId: parseInt(value)}));
        }
    }

    function handleGenreChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
        setFieldsData(prevState => ({ ...prevState, genreIds: selectedOptions }));
    }

    function updateBook(bookId: number) : void {
        setEditMode({id: bookId, isEditable: false});

        fieldsData.id = bookId;

        console.log(fieldsData);
        console.log(bookId);

        dispatch(updateBookAsync(fieldsData));
    }

    function deleteBook(id: number) : void {
        dispatch(deleteBookAsync(id));
    }

    return (
        <div>
            <h1 className="center">Books Page</h1>

            <div className="button-container">
                <Link to="/books/add"><input type="button" className="action-button" value="Add"/></Link>
                <Link to="/books/edit"><input type="button" className="action-button" value="Edit"/></Link>
                <Link to="/books/delete"><input type="button" className="action-button" value="Delete"/></Link>
            </div>

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
                {books.length > 0 ? editStatus.isEditable ?
                    books.map((book: IBook) => book.id === editStatus.id ?
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td><input type="text" name="book.title" placeholder={book.title} onChange={handleChange} required/></td>
                            <td><input type="number" name="book.year" placeholder={book.year.toString()} onChange={handleChange} required/></td>
                            <td><input type="text" name="book.description" placeholder={book.description} onChange={handleChange}/></td>
                            <td>
                                <select name="selectAuthor" onChange={handleChange} required>
                                    <option></option>
                                    {
                                        authors.map(author => (
                                            <option key={author.id} value={author.id}>{author.firstName + ' ' + author.lastName}</option>
                                        ))
                                    }
                                </select>
                            </td>
                            <td>
                                <select name="selectGenres" onChange={handleGenreChange} multiple required>
                                    {
                                        genreIds.map(genreId => (
                                            <option key={genreId} value={genreId}>{genreId}</option>
                                        ))
                                    }
                                </select>
                            </td>
                            <td>
                                <button className="button-no-effects" onClick={() => updateBook(book.id!)}>✅</button>
                            </td>
                            <td>
                                <button className="button-no-effects" onClick={() => deleteBook(book.id!)}>❌</button>
                            </td>
                        </tr>
                        : (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.year}</td>
                            <td>{book.description}</td>
                            <td>{getAuthorNameOrBookId(book)}</td>
                            <td>[{book.genreIds.join(', ')}]</td>
                            <td>
                                <button className="button-no-effects" onClick={() => setEditMode({id: book.id, isEditable: true})}>✏️</button>
                            </td>
                            <td>
                                <button className="button-no-effects" onClick={() => deleteBook(book.id!)}>❌</button>
                            </td>
                        </tr>
                    ))
                    : (
                    books.map((book: IBook) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.year}</td>
                            <td>{book.description}</td>
                            <td>{getAuthorNameOrBookId(book)}</td>
                            <td>[{book.genreIds.join(', ')}]</td>
                            <td>
                                <button className="button-no-effects" onClick={() => setEditMode({id: book.id, isEditable: true})}>✏️</button>
                            </td>
                            <td>
                                <button className="button-no-effects" onClick={() => deleteBook(book.id!)}>❌</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>                        
                        <td colSpan={6}>No books found</td>
                    </tr>
                )}
                </tbody>
            </table>
            <input type="button" className="action-button" value="Refresh Books" onClick={refreshBooks} />
        </div>
    );
}

export default Book;
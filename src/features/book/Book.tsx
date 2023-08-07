import React, {useEffect} from 'react'
import {
    deleteBookAsync,
    getBooksAsync,
    removeBooks,
    selectBooks,
    setBookToEdit,
} from "./bookSlice";
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {getAuthorsAsync, removeAuthors, selectAuthors} from "../author/authorSlice";
import {Link} from "react-router-dom";
import {getGenresAsync, removeGenres, selectGenres} from "../genre/genreSlice";
import {IBook} from "./bookModels";
import {IAuthor} from "../author/authorModels";
import {IGenre} from "../genre/genreModels";

function Book() {
    const dispatch = useAppDispatch();
    const books: IBook[] = useSelector(selectBooks);
    const authors: IAuthor[] = useSelector(selectAuthors);
    const genres: IGenre[] = useSelector(selectGenres);


    useEffect(() => {
        dispatch(getBooksAsync());
        dispatch(getAuthorsAsync());
        dispatch(getGenresAsync());

        return () => {
            dispatch(removeBooks());
            dispatch(removeAuthors());
            dispatch(removeGenres());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    function getShortenedDescription(description: string | undefined) : string {
        if (description) {
            return description.length > 47 ? `${description.substring(0, 47)}...` : description;
        } else {
            return '';
        }
    }

    function getAuthorName(authorId: number): string {
        const author: IAuthor | undefined = authors.find(author => author.id === authorId);

        if (author) {
            return author.firstName + ' ' + author.lastName;
        }

        return '';
    }

    function getGenreNames(genreIds: number[]): string {
        const genreNames: string[] = genres
            .filter((genre: IGenre) => genreIds.includes(genre.id!))
            .map((genre: IGenre) => genre.name);

        return genreNames.join(', ');
    }

    function deleteBook(id: number) : void {
        const isConfirmed: boolean = window.confirm('Are you sure that you want to delete the current book?');

        if (isConfirmed) {
            dispatch(deleteBookAsync(id));
        }
    }

    return (
        <div>
            <h1 className="center">Books Page</h1>

            <div className="button-container">
                <Link to="/books/add"><input type="button" className="action-button" value="Add"/></Link>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Description</th>
                        <th>Author</th>
                        <th>Genres</th>
                    </tr>
                </thead>
                <tbody>
                {books?.length > 0 ?
                    books.map((book: IBook) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.year}</td>
                            <td>{getShortenedDescription(book.description)}</td>
                            <td>{getAuthorName(book.authorId)}</td>
                            <td>[{getGenreNames(book.genreIds)}]</td>
                            <td>
                                <Link to="/books/edit">
                                    <button
                                        className="button-no-effects"
                                        onClick={() => dispatch(setBookToEdit(book))}>
                                        ✏️
                                    </button>
                                </Link>
                            </td>
                            <td>
                                <button
                                    className="button-no-effects"
                                    onClick={() => deleteBook(book.id!)}>
                                    ❌
                                </button>
                            </td>
                        </tr>
                    ))
                    : (
                    <tr>                        
                        <td colSpan={6}>No books found</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default Book;
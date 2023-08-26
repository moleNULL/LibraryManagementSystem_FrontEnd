import React, {useEffect} from 'react'
import {
    deleteBook,
    getBooks,
    removeBooks,
    selectBooks, selectIsBookDeleted,
    selectIsBookLoading,
} from "./bookSlice";
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {getAuthors, removeAuthors, selectAuthors} from "../author/authorSlice";
import {Link} from "react-router-dom";
import {getGenres, removeGenres, selectGenres} from "../genre/genreSlice";
import {IBook} from "./bookModels";
import {IAuthorSimple} from "../author/authorModels";
import {IGenre} from "../genre/genreModels";
import Spinner from "../Spinner";
import {selectUserRole} from "../auth/authSlice";
import DeleteBookNotification from "./components/DeleteBookNotification";
import {AppDispatch} from "../../app/store";

function BookList() {
    const dispatch: AppDispatch = useAppDispatch();
    const books: IBook[] = useSelector(selectBooks);
    const authors: IAuthorSimple[] = useSelector(selectAuthors);
    const genres: IGenre[] = useSelector(selectGenres);
    const isBookLoading: boolean = useSelector(selectIsBookLoading);
    const isBookDeleted: boolean | null = useSelector(selectIsBookDeleted);
    const userRole: string | undefined = useSelector(selectUserRole);

    useEffect(() => {
        dispatch(getBooks());
        dispatch(getAuthors());
        dispatch(getGenres());

        return () => {
            dispatch(removeBooks());
            dispatch(removeAuthors());
            dispatch(removeGenres());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    if (isBookLoading) {
        return <Spinner />;
    }

    function getShortenedDescription(description: string | undefined) : string {
        if (description) {
            return description.length > 47 ? `${description.substring(0, 47)}...` : description;
        } else {
            return '';
        }
    }

    function getAuthorName(authorId: number): string {
        const author: IAuthorSimple | undefined = authors.find(author => author.id === authorId);

        if (author) {
            return author.fullName;
        }

        return '';
    }

    function getGenreNames(genreIds: number[]): string {
        const genreNames: string[] = genres
            .filter((genre: IGenre) => genreIds.includes(genre.id!))
            .map((genre: IGenre) => genre.name);

        return genreNames.join(', ');
    }

    function deleteCurrentBook(id: number) : void {
        const isConfirmed: boolean = window.confirm('Are you sure that you want to delete the current book?');

        if (isConfirmed) {
            dispatch(deleteBook(id));
        }
    }

    return (
        <div>
            {
                userRole === 'librarian' &&
                <>
                    <h1 className="center">Books Page</h1>
                    <div className="button-container">
                        <Link to="/books/add"><input type="button" className="action-button" value="Add"/></Link>
                    </div>
                </>
            }

            {
                userRole === 'student' &&
                <h1 className="center">Books Page with favorite genres</h1>
            }

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
                        <tr key={`book_${book.id}`}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.year}</td>
                            <td>{getShortenedDescription(book.description)}</td>
                            <td>{getAuthorName(book.authorId)}</td>
                            <td>{getGenreNames(book.genreIds)}</td>
                            {
                                userRole === 'librarian' &&
                                <>
                                    <td>
                                        <Link to={`/books/${book.id}/edit`}>
                                            <button
                                                className="button-no-effects">
                                                ✏️
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="button-no-effects"
                                            onClick={() => deleteCurrentBook(book.id!)}>
                                            ❌
                                        </button>
                                    </td>
                                </>
                            }
                        </tr>
                    ))
                    : (
                    <tr>                        
                        <td colSpan={6}>No books found</td>
                    </tr>
                )}
                </tbody>
            </table>
            <DeleteBookNotification isBookDeleted={isBookDeleted}/>
        </div>
    );
}

export default BookList;
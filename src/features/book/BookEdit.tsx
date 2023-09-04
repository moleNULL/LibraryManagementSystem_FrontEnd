import React, {useEffect, useState} from 'react'
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {AppDispatch} from "../../app/store";
import {
    getBookById,
    removeBooks, selectBooks,
    selectIsBookLoading, selectIsBookUpdated,
    updateBook
} from "./bookSlice";
import {getAuthors, removeAuthors, selectAuthors, selectIsAuthorLoading} from "../author/authorSlice";
import {Link, useParams} from "react-router-dom";
import {IBook} from "./bookModels";
import {IAuthorSimple} from "../author/authorModels";
import {IGenre} from "../genre/genreModels";
import {getGenres, removeGenres, selectGenres, selectIsGenreLoading} from "../genre/genreSlice";
import {isEqual} from "lodash";
import BookForm from './components/BookForm';
import {updateFormBookData, updateFormBookGenresData} from "../../utils/bookHelpers";
import Spinner from "../Spinner";
import useCrudNotification from "../../hooks/useCrudNotification";

function BookEdit() {
    const dispatch: AppDispatch = useAppDispatch();
    const {id} = useParams();
    const authors: IAuthorSimple[] = useSelector(selectAuthors);
    const genres: IGenre[] = useSelector(selectGenres);
    const isBookLoading: boolean = useSelector(selectIsBookLoading);
    const isAuthorLoading: boolean = useSelector(selectIsAuthorLoading);
    const isGenreLoading: boolean = useSelector(selectIsGenreLoading);
    const isBookUpdated: boolean | undefined = useSelector(selectIsBookUpdated);
    let bookToEdit: IBook = useSelector(selectBooks)[0];

    const [formBookData, setFormBookData] = useState<IBook>(bookToEdit);
    useCrudNotification('Updated book', isBookUpdated);

    useEffect(() => {
        dispatch(getBookById(parseInt(id!)));
        dispatch(getAuthors());
        dispatch(getGenres());

        return (() => {
            dispatch(removeBooks());
            dispatch(removeAuthors());
            dispatch(removeGenres());
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        setFormBookData(bookToEdit);
    }, [bookToEdit]);


    if (isBookLoading || isAuthorLoading || isGenreLoading) {
        return <Spinner />;
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) : void {
        event.preventDefault();

        if (isEqual(bookToEdit, formBookData)) {
            alert("You haven't changed anything");
        }
        else {
            dispatch(updateBook(formBookData));
            bookToEdit = formBookData; // refresh the data for bookToEdit after successful update
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) : void {
        updateFormBookData(event, setFormBookData);
    }

    function handleGenreChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        updateFormBookGenresData(event, setFormBookData);
    }

    return (
        <div>
            <h1 className="center">Edit Book Page</h1>

            <div className="button-container">
                <Link to="/books"><button className="action-button">{"<—"}</button></Link>
            </div>
            {
                bookToEdit ?
                    bookToEdit.id ?
                        <main>
                            <BookForm
                                formBookData={formBookData}
                                authors={authors}
                                genres={genres}
                                handleSubmit={handleSubmit}
                                handleChange={handleChange}
                                handleGenreChange={handleGenreChange}
                                submitButtonText={"Edit Book"}
                            />
                        </main>
                    : <h2>No book chosen to edit</h2>
                : <></>
            }
        </div>
    );
}

export default BookEdit;
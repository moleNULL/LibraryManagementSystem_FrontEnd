import React, {useEffect, useState} from 'react'
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {AppDispatch, } from "../../app/store";
import {selectBookToEdit, updateBookAsync} from "./bookSlice";
import {getAuthorsAsync, selectAuthors} from "../author/authorSlice";
import {Link} from "react-router-dom";
import {IBook} from "./bookModels";
import {IAuthor} from "../author/authorModels";
import {IGenre} from "../genre/genreModels";
import {getGenresAsync, selectGenres} from "../genre/genreSlice";
import _ from "lodash";
import BookForm from './components/BookForm';


function BookEdit() {
    const dispatch: AppDispatch = useAppDispatch();
    const authors: IAuthor[] = useSelector(selectAuthors);
    const genres: IGenre[] = useSelector(selectGenres);
    let bookToEdit: IBook = useSelector(selectBookToEdit);

    const [formBookData, setFormBookData] = useState<IBook>(bookToEdit);

    useEffect(() => {
        dispatch(getAuthorsAsync());
        dispatch(getGenresAsync());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) : void {
        event.preventDefault();

        if (_.isEqual(bookToEdit, formBookData)) {
            alert("You haven't changed anything");
        }
        else {
            dispatch(updateBookAsync(formBookData));
            bookToEdit = formBookData; // refresh the data for bookToEdit after successful update
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) : void {
        const {name, value} = event.target;

        if (name === 'book.title') {
            setFormBookData(prevState => ({...prevState, title: value}));
        }

        if (name === 'book.year') {
            setFormBookData(prevState => ({...prevState, year: parseInt(value)}));
        }

        if (name === 'book.description') {
            if (value) {
                setFormBookData(prevState => ({...prevState, description: value}));
            }
        }

        if (name === 'book.selectedAuthorId') {
            setFormBookData(prevState => ({...prevState, authorId: parseInt(value)}));
        }
    }

    function handleGenreChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        const selectedOptions: number[] = Array.from(event.target.selectedOptions).map(option => parseInt(option.value));
        setFormBookData((prevState: IBook) => ({ ...prevState, genreIds: selectedOptions }));
    }

    return (
        <div>
            <h1 className="center">Edit Book Page</h1>

            <div className="button-container">
                <Link to="/books"><button className="action-button">{"<—"}</button></Link>
            </div>

            {
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
            }
        </div>
    );
}

export default BookEdit;
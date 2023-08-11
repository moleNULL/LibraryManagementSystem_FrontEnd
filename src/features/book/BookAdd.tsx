import React, {useEffect, useState} from 'react'
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {addBook} from "./bookSlice";
import {getAuthors, selectAuthors} from "../author/authorSlice";
import {Link} from "react-router-dom";
import {IBook} from "./bookModels";
import {IAuthorSimple} from "../author/authorModels";
import {IGenre} from "../genre/genreModels";
import {getGenres, selectGenres} from "../genre/genreSlice";
import {AppDispatch} from "../../app/store";
import BookForm from './components/BookForm';
import {updateFormBookData, updateFormBookGenresData} from "./bookHelpers";

const initialFormBookData: IBook = {
    id: undefined,
    title: "",
    year: 2020,
    description: "",
    authorId: 0,
    genreIds: [],
}

function BookAdd() {
    const dispatch: AppDispatch = useAppDispatch();
    const authors: IAuthorSimple[] = useSelector(selectAuthors);
    const genres: IGenre[] = useSelector(selectGenres);

    const [formBookData, setFormBookData] = useState<IBook>(initialFormBookData);

    useEffect(() => {
        dispatch(getAuthors());
        dispatch(getGenres());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) : void {
        event.preventDefault();

        dispatch(addBook(formBookData));
        setFormBookData(initialFormBookData);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) : void {
        updateFormBookData(event, formBookData, setFormBookData);
    }

    function handleGenreChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        updateFormBookGenresData(event, formBookData, setFormBookData);
    }

    return (
        <div>
            <header>
                <h1 className="center">Add Book Page</h1>
            </header>

            <div className="button-container">
                <Link to="/books">
                    <button className="action-button">{"<—"}</button>
                </Link>
            </div>

            <main>
                <BookForm
                    formBookData={formBookData}
                    authors={authors}
                    genres={genres}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleGenreChange={handleGenreChange}
                    submitButtonText={"Add Book"}
                />
            </main>
        </div>
    );
}
export default BookAdd;
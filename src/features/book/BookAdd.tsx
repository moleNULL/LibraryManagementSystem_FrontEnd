import React, {useEffect, useState} from 'react'
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {addBooksAsync} from "./bookSlice";
import {getAuthorsAsync, selectAuthors} from "../author/authorSlice";
import {Link} from "react-router-dom";
import {IBook} from "./bookModels";
import {IAuthor} from "../author/authorModels";
import {IGenre} from "../genre/genreModels";
import {getGenresAsync, selectGenres} from "../genre/genreSlice";
import {AppDispatch} from "../../app/store";
import BookForm from './components/BookForm';

const initialFormData: IBook = {
    id: undefined,
    title: "",
    year: 2020,
    description: "",
    authorId: 0,
    genreIds: [],
}

function BookAdd() {
    const dispatch: AppDispatch = useAppDispatch();
    const authors: IAuthor[] = useSelector(selectAuthors);
    const genres: IGenre[] = useSelector(selectGenres);

    const [formBookData, setFormBookData] = useState<IBook>(initialFormData);

    useEffect(() => {
        dispatch(getAuthorsAsync());
        dispatch(getGenresAsync());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) : void {
        event.preventDefault();

        dispatch(addBooksAsync(formBookData));

        setFormBookData(initialFormData);
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

    function handleGenreChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        const selectedOptions: number[] = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
        setFormBookData((prevState: IBook) => ({ ...prevState, genreIds: selectedOptions }));
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
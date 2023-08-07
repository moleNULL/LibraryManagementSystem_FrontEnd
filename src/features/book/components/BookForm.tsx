import React from 'react'
import {IGenre} from "../../genre/genreModels";
import {IBook} from "../bookModels";
import {IAuthor} from "../../author/authorModels";

interface IBookFormProps {
    formBookData: IBook,
    authors: IAuthor[],
    genres: IGenre[],
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
    handleGenreChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    submitButtonText: string,
}

function BookForm(props: IBookFormProps) {

    return (
        <form onSubmit={props.handleSubmit}>
            <label>
                Title:
                <br />
                <input
                    type="text"
                    name="book.title"
                    value={props.formBookData.title}
                    onChange={props.handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Year:
                <br />
                <input
                    type="number"
                    max={new Date().getFullYear()}
                    name="book.year"
                    value={props.formBookData.year}
                    onChange={props.handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Description:
                <br />
                <textarea
                    name="book.description"
                    value={props.formBookData.description}
                    onChange={props.handleChange}
                    rows={10}>
                        </textarea>
            </label>
            <br />
            <label>
                Author:
                <br />
                <select
                    name="book.selectedAuthorId"
                    onChange={props.handleChange}
                    value={props.formBookData.authorId}
                    required
                >
                    <option value="">Select an author</option>
                    {props.authors.map((author: IAuthor) => (
                        <option key={author.id} value={author.id}>
                            {author.firstName + " " + author.lastName}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Genres:
                <br />
                <select
                    name="book.selectedGenreIds"
                    onChange={props.handleGenreChange}
                    value={props.formBookData.genreIds.map((genreId: number) => genreId.toString())}
                    multiple
                    required
                >
                    {props.genres.map((genre: IGenre) => (
                        <option key={`genre_${genre.id}`} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <div>
                <input type="submit" className="btn-change" value={props.submitButtonText} />
            </div>
        </form>
    );
}

export default BookForm;
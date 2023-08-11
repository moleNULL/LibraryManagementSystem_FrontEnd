import React from 'react'
import {IGenre} from "../../genre/genreModels";
import {IBook} from "../bookModels";
import {IAuthorSimple} from "../../author/authorModels";

interface IBookFormProps {
    formBookData: IBook | undefined,
    authors: IAuthorSimple[],
    genres: IGenre[],
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
    handleGenreChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    submitButtonText: string,
}

function BookForm(
    {
        formBookData,
        authors,
        genres,
        handleSubmit,
        handleChange,
        handleGenreChange,
        submitButtonText
    }: IBookFormProps) {

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <br />
                <input
                    type="text"
                    name="book.title"
                    value={formBookData?.title}
                    onChange={handleChange}
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
                    value={formBookData?.year}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Description:
                <br />
                <textarea
                    name="book.description"
                    value={formBookData?.description}
                    onChange={handleChange}
                    rows={10}>
                </textarea>
            </label>
            <br />
            <label>
                Author:
                <br />
                <select
                    name="book.selectedAuthorId"
                    onChange={handleChange}
                    value={formBookData?.authorId}
                    required
                >
                    <option value="">Select an author</option>
                    {authors.map((author: IAuthorSimple) => (
                        <option key={author.id} value={author.id}>
                            {author.fullName}
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
                    onChange={handleGenreChange}
                    value={formBookData?.genreIds.map((genreId: number) => genreId.toString())}
                    multiple
                    required
                >
                    {genres.map((genre: IGenre) => (
                        <option key={`genre_${genre.id}`} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <div>
                <input type="submit" className="btn-change" value={submitButtonText} />
            </div>
        </form>
    );
}

export default BookForm;
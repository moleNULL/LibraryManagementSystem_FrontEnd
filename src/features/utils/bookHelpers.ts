import {IBook, IBookFull} from "../book/bookModels";
import React from "react";

export function createFullBook (book: IBook) : IBookFull {
     return {
        ...book,
        languageId: 1,
        pagesNumber: 1111,
        publisherId: 1,
        warehouse: {
            price: 66,
            quantity: 7
        },
    };
}

export function extractSimpleBook(fullBooks: IBookFull[]) : IBook[] {
    return fullBooks.map((fullBook: IBookFull) => {
        return {
            ...fullBook,
        };
    });
}

export function handleError(error: any, message: string, bookInfo?: IBookFull) : void {
    console.log(`Display message: ${message}`);
    console.log(`Error message: ${error.message}`);

    if (bookInfo) {
        console.log(bookInfo);
    }

    alert(message);
}

export function updateFormBookData(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    formBookData: IBook,
    setFormBookData: React.Dispatch<React.SetStateAction<IBook>>) : void {
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

export function updateFormBookGenresData(
    event: React.ChangeEvent<HTMLSelectElement>,
    formBookData: IBook,
    setFormBookData: React.Dispatch<React.SetStateAction<IBook>>
) {
    const selectedOptions: number[] = Array.from(event.target.selectedOptions).map(option => parseInt(option.value));
    setFormBookData((prevState: IBook) => ({ ...prevState, genreIds: selectedOptions }));
}
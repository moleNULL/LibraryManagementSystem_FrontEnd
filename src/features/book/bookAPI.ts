import {AxiosResponse} from "axios";
import {IBook, IBookFull} from "./bookModels";
import API from '../apiLibrary'

export function fetchBooksAsync() : Promise<AxiosResponse<IBook[]>> {
    return API.get('/books', {
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem("jwt")}`
        }
    });
}

export function fetchBookByIdAsync(id: number) : Promise<AxiosResponse<IBook>> {
    return API.get(`/books/${id}`);
}

export function addBooksAsync(book: IBookFull) : Promise<AxiosResponse<number>> {
    return API.post('/books', book);
}

export function updateBookAsync(book: IBookFull) : Promise<AxiosResponse<boolean>> {
    return API.put(`/books/${book.id}`, book);
}

export function deleteBookAsync(id: number) : Promise<AxiosResponse<boolean>> {
    return API.delete(`/books/${id}`);
}
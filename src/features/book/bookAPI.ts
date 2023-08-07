import {AxiosResponse} from "axios";
import {IBookFull} from "./bookModels";
import API from '../api'

export function fetchBooksService() : Promise<AxiosResponse<IBookFull[], any>> {
    return API.get('books/books');
}

export function addBooksService(book: IBookFull) : Promise<AxiosResponse<number, any>> {
    return API.post('books/books', book);
}

export function updateBookService(book: IBookFull) : Promise<AxiosResponse<boolean, any>> {
    return API.put(`books/books/${book.id}`, book);
}

export function deleteBookService(id: number) : Promise<AxiosResponse<boolean, any>> {
    return API.delete(`books/books/${id}`);
}
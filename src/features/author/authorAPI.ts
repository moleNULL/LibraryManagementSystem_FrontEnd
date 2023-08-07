import {AxiosResponse} from "axios";
import {IAuthor} from "./authorModels";
import API from '../api'

export function fetchAuthors() : Promise<AxiosResponse<IAuthor[], any>> {
    return API.get('books/authors');
}
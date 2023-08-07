import {AxiosResponse} from "axios";
import {IGenre} from "./genreModels";
import API from '../api'

export function fetchGenres(): Promise<AxiosResponse<IGenre[], any>> {
    return API.get('books/genres');
}
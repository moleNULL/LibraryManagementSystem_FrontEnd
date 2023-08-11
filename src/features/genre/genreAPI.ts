import {AxiosResponse} from "axios";
import {IGenre} from "./genreModels";
import API from '../apiLibrary'

export function fetchGenresAsync(): Promise<AxiosResponse<IGenre[]>> {
    return API.get('/genres');
}
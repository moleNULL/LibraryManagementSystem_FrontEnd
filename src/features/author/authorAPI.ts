import {AxiosResponse} from "axios";
import {IAuthorSimple} from "./authorModels";
import API from '../apiLibrary'

export function fetchAuthorsAsync() : Promise<AxiosResponse<IAuthorSimple[]>> {
    return API.get('/authors');
}
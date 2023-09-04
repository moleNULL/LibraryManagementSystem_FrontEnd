import API from '../apiLibrary'
import {AxiosResponse} from "axios";
import {IStudent} from "../student/studentModel";

export function serverLogInAsync(): Promise<AxiosResponse<string>> {
    return API.post('/account/login');
}

export function serverRegisterStudentAsync(studentData: IStudent) : Promise<AxiosResponse<string>> {
    return API.post('/account/register/student', studentData);
}

export function serverLogOutAsync() : Promise<AxiosResponse<string>> {
    return API.post('/account/logout');
}
import API from '../apiLibrary'
import {getJwtToken} from "../utils/jwtHelpers";
import {AxiosResponse} from "axios";
import {IStudent} from "../student/studentModel";

export function serverLogInAsync(): Promise<AxiosResponse<string>> {
    return API.post('/account/login', null, {
        headers: {
            Authorization: `Bearer ${getJwtToken()}`
        },
        withCredentials: true,
    });
}

export function serverRegisterStudentAsync(studentData: IStudent) : Promise<AxiosResponse<string>> {
    return API.post('/account/register/student', studentData, {
        headers: {
            Authorization: `Bearer ${getJwtToken()}`,
        },
        withCredentials: true,
    })
}
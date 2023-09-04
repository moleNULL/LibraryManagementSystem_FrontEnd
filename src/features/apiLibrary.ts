import axios, {AxiosInstance} from "axios";
import {getJwtToken} from "../utils/jwtHelpers";

const API: AxiosInstance = axios.create({
    baseURL: `https://localhost:7170/api/v1`,
    headers: {
        Authorization: `Bearer ${getJwtToken()}`
    },
    withCredentials: true,
});

API.interceptors.request.use(config => {
    config.headers!.Authorization = `Bearer ${getJwtToken()}`;
    return config;
});

export default API;
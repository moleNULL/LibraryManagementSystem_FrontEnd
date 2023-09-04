import {LOCAL_STORAGE_JWT, LOCAL_STORAGE_JWT_EXPIRATION} from "../common/constants";
import jwt_decode from "jwt-decode";

export function getJwtToken(): string | null {
    return  window.localStorage.getItem(LOCAL_STORAGE_JWT);
}

export function getJwtExpirationTime(): string | null {
    return window.localStorage.getItem(LOCAL_STORAGE_JWT_EXPIRATION);
}

export function setJwtToken(token: string, expirationTime: string): void {
    window.localStorage.setItem(LOCAL_STORAGE_JWT, token);
    window.localStorage.setItem(LOCAL_STORAGE_JWT_EXPIRATION, expirationTime);
}

export function removeJwtToken(): void {
    window.localStorage.removeItem(LOCAL_STORAGE_JWT);
    window.localStorage.removeItem(LOCAL_STORAGE_JWT_EXPIRATION);
}

export function extractUserFullNameFromJwt(token: string): string {
    const userLoginData: any = jwt_decode(token);
    return userLoginData.name;
}

export function extractUserEmailFromJwt(token: string): string {
    const userLoginData: any = jwt_decode(token);
    return userLoginData.email;
}
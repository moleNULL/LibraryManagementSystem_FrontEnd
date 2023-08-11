import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {redirect} from "react-router-dom";

interface IAuth {
    isLoggedIn: boolean,
    userName: string,
    userStatus: string | null,
}

const initialState: IAuth = {
    isLoggedIn: false,
    userName: '',
    userStatus: 'student',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userName = action.payload;
        },
        logout: state => {
            state.isLoggedIn = false;
            state.userName = '';
        }
    }
})

export const {login, logout} = authSlice.actions;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectUserStatus = (state: RootState) => state.auth.userStatus;
export default authSlice.reducer;
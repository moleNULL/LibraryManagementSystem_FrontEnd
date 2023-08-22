import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

interface IAuth {
    isLoggedIn: boolean,
    userName: string,
    userRole: string | null,
}

const initialState: IAuth = {
    isLoggedIn: false,
    userName: '',
    userRole: 'librarian',
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
        },
        setUserRole: (state, action) => {
            state.userRole = action.payload;
        }
    }
})

export const {
    login,
    logout,
    setUserRole} = authSlice.actions;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectUserStatus = (state: RootState) => state.auth.userRole;
export default authSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {serverLogInAsync, serverRegisterStudentAsync} from "./authApi";
import {IStudent} from "../student/studentModel";

interface IAuth {
    isPendingRegistration?: boolean,
    isServerResponseLoading: boolean,
    isRegistered: boolean,
    isLoggedIn: boolean,
    userName: string,
    userRole?: string,
}

const initialState: IAuth = {
    isPendingRegistration: undefined,
    isServerResponseLoading: false,
    isRegistered: false,
    isLoggedIn: false,
    userName: '',
    userRole: '',
}

export const serverLogIn = createAsyncThunk('auth/serverLogIn', async () => {
    try {
        const response = await serverLogInAsync();
        return response.data;
    }
    catch (error: any) {
        if (error.message.includes('401')) {
            throw error;
        }
    }
});

export const serverRegisterStudent = createAsyncThunk('auth/serverRegisterStudent', async (studentData: IStudent) => {
    try {
        const response = await serverRegisterStudentAsync(studentData);
        return response.data;
    }
    catch (error: any) {
        throw error;
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.isPendingRegistration = false;
            state.userName = action.payload;
        },
        logout: state => {
            state.isLoggedIn = false;
            state.isPendingRegistration = undefined;
            state.userName = '';
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setUserRole: (state, action) => {
            state.userRole = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(serverLogIn.pending, state => {
                state.isPendingRegistration = undefined;
                state.isServerResponseLoading = true;
                state.isLoggedIn = false;
                state.userName = '';
                state.userRole = '';
            })
            .addCase(serverLogIn.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.isPendingRegistration = false;
                state.isServerResponseLoading = false;
                state.userRole = action.payload!;
            })
            .addCase(serverLogIn.rejected, state => {
                state.isPendingRegistration = true;
                state.isServerResponseLoading = false;
                state.isLoggedIn = false;
            })
            .addCase(serverRegisterStudent.pending, state => {
                state.isPendingRegistration = true;
                state.isServerResponseLoading = false;
                state.isRegistered = false;
                state.isLoggedIn = false;
            })
            .addCase(serverRegisterStudent.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.isRegistered = true;
                state.isPendingRegistration = false;
                state.isServerResponseLoading = false;

                if (action.payload) {
                    alert('You have been registered!');
                    state.userRole = action.payload;
                }
            })
            .addCase(serverRegisterStudent.rejected, state => {
                state.isPendingRegistration = true;
                state.isServerResponseLoading = false;
                state.isLoggedIn = false;
                state.isRegistered = false;
            });
    }
})

export const {
    login,
    logout,
    setUserRole,
    setUserName} = authSlice.actions;
export const selectIsPendingRegistration = (state: RootState) => state.auth.isPendingRegistration;
export const selectIsServerResponseLoading = (state: RootState) => state.auth.isServerResponseLoading;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRegistered = (state: RootState) => state.auth.isRegistered;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectUserRole = (state: RootState) => state.auth.userRole;

export default authSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {serverLogInAsync, serverLogOutAsync, serverRegisterStudentAsync} from "./authApi";
import {IStudent} from "../student/studentModel";
import {removeJwtToken} from "../../utils/jwtHelpers";

interface IAuth {
    isPendingRegistration?: boolean,
    isServerResponseLoading: boolean,
    isLoggedIn: boolean,
    userName: string,
    userRole?: string,
}

const initialState: IAuth = {
    isPendingRegistration: undefined,
    isServerResponseLoading: false,
    isLoggedIn: false,
    userName: '',
    userRole: '',
}

export const serverLogIn = createAsyncThunk('auth/serverLogIn', async () => {
    const response = await serverLogInAsync();
    return response.data;
});

export const serverRegisterStudent = createAsyncThunk('auth/serverRegisterStudent', async (studentData: IStudent) => {
    const response = await serverRegisterStudentAsync(studentData);
    return response.data;
})

export const serverLogOut = createAsyncThunk('auth/serverLogOut', async() => {
   try {
       const response = await serverLogOutAsync();
       return response.data;
   }
   finally {
       removeJwtToken();
   }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.isPendingRegistration = false;
            state.isServerResponseLoading = false;
            state.userName = action.payload;
        },
        logout: () => initialState,
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setUserRole: (state, action) => {
            state.userRole = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(serverLogIn.pending, (state) => {
                return {
                    ...initialState,
                    isServerResponseLoading: true,
                }
            })
            .addCase(serverLogIn.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.isPendingRegistration = false;
                state.isServerResponseLoading = false;
                state.userRole = action.payload!;
            })
            .addCase(serverLogIn.rejected, (state, action) => {
                state.isServerResponseLoading = false;
                state.isLoggedIn = false;
                state.isPendingRegistration = !!action.error.message!.includes('403');
            })
            .addCase(serverRegisterStudent.pending, state => {
                state.isPendingRegistration = true;
                state.isServerResponseLoading = false;
                state.isLoggedIn = false;
            })
            .addCase(serverRegisterStudent.fulfilled, (state, action) => {
                state.isLoggedIn = true;
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
            })
            .addCase(serverLogOut.pending, state => {
                state.isServerResponseLoading = true;
                state.isPendingRegistration = undefined;
            })
            .addCase(serverLogOut.fulfilled, () => initialState)
            .addCase(serverLogOut.rejected, () => initialState);
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
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectUserRole = (state: RootState) => state.auth.userRole;

export default authSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IAuthor} from "./authorModels";
import {fetchAuthors} from "./authorAPI";
import {RootState} from "../../app/store";


const initialState = {
    items: [] as IAuthor[]
}

export const getAuthorsAsync = createAsyncThunk('author/getAuthors', async (_, {dispatch}) => {
    const response = await fetchAuthors();
    return response.data;
})

const authorSlice = createSlice({
    name: 'author',
    initialState,
    reducers: {
        setAuthors: (state, action) => {
            state.items = action.payload;
        },
        removeAuthors: state => {
            state.items = [];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAuthorsAsync.fulfilled, (state, action) => {
                state.items = action.payload;
            })
    }
})

export const {setAuthors, removeAuthors} = authorSlice.actions;

export const selectAuthors = (state: RootState) => state.authors.items;
export default authorSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IAuthorSimple} from "./authorModels";
import {fetchAuthorsAsync} from "./authorAPI";
import {RootState} from "../../app/store";


const initialState = {
    items: [] as IAuthorSimple[],
    isLoading: false,
}

export const getAuthors = createAsyncThunk('author/getAuthors', async () => {
    const response = await fetchAuthorsAsync();
    return response.data;
})

const authorSlice = createSlice({
    name: 'author',
    initialState,
    reducers: {
        setAuthors: (state, action) => {
            state.items = action.payload;
        },
        removeAuthors: () => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(getAuthors.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(getAuthors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(getAuthors.rejected, (state, action) => {
                state.isLoading = false;
                console.log(`Error: ${action.error.message}`);
                alert('Error while fetching authors');
            });
    }
})

export const {setAuthors, removeAuthors} = authorSlice.actions;

export const selectAuthors = (state: RootState) => state.authors.items;
export const selectIsAuthorLoading = (state: RootState) => state.authors.isLoading;
export default authorSlice.reducer;
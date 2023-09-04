import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchGenresAsync} from "./genreAPI";
import {IGenre} from "./genreModels";
import {RootState} from "../../app/store";

const initialState = {
    items: [] as IGenre[],
    isLoading: false,
};

export const getGenres = createAsyncThunk('genre/getGenres', async () => {
    const response = await fetchGenresAsync();
    return response.data;
});

const genreSlice = createSlice({
    name: 'genre',
    initialState,
    reducers: {
        setGenres: (state, action) => {
            state.items = action.payload;
        },
        removeGenres: () => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(getGenres.pending, (state) => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(getGenres.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload!;
            })
            .addCase(getGenres.rejected, (state, action) => {
                state.isLoading = false;
                console.log(`Error: ${action.error.message}`);
                alert('Error while fetching genres');
            });
    }
});


export const {
    setGenres,
    removeGenres} = genreSlice.actions;

export const selectGenres = (state: RootState) => state.genres.items;
export const selectIsGenreLoading = (state: RootState) => state.genres.isLoading;

export default genreSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchGenres} from "./genreAPI";
import {IGenre} from "./genreModels";
import {RootState} from "../../app/store";

const initialState = {
    items: [] as IGenre[]
};



export const getGenresAsync = createAsyncThunk('genre/getGenres', async () => {
    try {
        const response = await fetchGenres();
        return response.data;
    }
    catch (e) {
        console.log(e);
        alert('Error while fetching genres');
    }
});

const genreSlice = createSlice({
    name: 'genre',
    initialState,
    reducers: {
        setGenres: (state, action) => {
            state.items = action.payload;
        },
        removeGenres: state => {
            state.items = [];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getGenresAsync.fulfilled, (state, action) => {
                state.items = action.payload!;
            });
    }
});


export const {setGenres, removeGenres} = genreSlice.actions;

export const selectGenres = (state: RootState) => state.genres.items;

export default genreSlice.reducer;
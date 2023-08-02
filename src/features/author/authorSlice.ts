import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export interface IAuthor {
    id: number,
    firstName: string,
    lastName: string
}

const initialState = {
    items: [] as IAuthor[]
}

export const getAuthorsAsync = createAsyncThunk('author/getAuthors', async (_, {dispatch}) => {
    const response = await axios.get('http://localhost:5000/api/authors');
    const authorsData = response.data;

    dispatch(setAuthors(authorsData));
})

const authorSlice = createSlice({
    name: 'author',
    initialState,
    reducers: {
        setAuthor: (state, action) =>  {
            state.items.push(action.payload);
        },
        setAuthors: (state, action) => {
            state.items.push(...action.payload);
        }
    }
})

export default authorSlice.reducer;

export const {setAuthor, setAuthors} = authorSlice.actions;
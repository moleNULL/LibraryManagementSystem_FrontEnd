import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import book from "./Book";

export interface IBook {
    id?: number,
    title: string,
    year: number,
    description?: string,
    authorId: number,
    genreIds: number[]
}

interface IBookFull extends IBook {
    pagesNumber: number,
    publisherId: number,
    warehouse: {
        price: number,
        quantity: number,
    },
    languageId: number,
}

const initialState = {
  items: [] as IBook[]
};

export const getBooksAsync = createAsyncThunk('book/getBooks', async (_, {dispatch}) => {
    const response = await axios.get('http://localhost:5000/api/books');
    const booksData = response.data;

    booksData.map((bookData: any) => {

        let shortenedDescription =
            bookData.description.length > 50 ? `${bookData.description.substring(0, 50)}...` : bookData.description;

        const book: IBook = {
            id: bookData.id,
            title: bookData.title,
            year: bookData.year,
            description: shortenedDescription,
            authorId: bookData.authorId,
            genreIds: bookData.genreIds,
        };

        dispatch(setBook(book));
    });
})

export const postBooksAsync = createAsyncThunk('book/postBooks', async (bookToAdd: IBook) => {
    const fullBookToAdd: IBookFull = {
        authorId: bookToAdd.authorId,
        description: bookToAdd.description,
        genreIds: bookToAdd.genreIds,
        languageId: 1,
        pagesNumber: 1111,
        publisherId: 1,
        title: bookToAdd.title,
        warehouse:
            {
                price: 66,
                quantity: 7
            },
        year: bookToAdd.year
    };

    try {
        const response = await axios.post('http://localhost:5000/api/books', fullBookToAdd);
        console.log(`Last inserted id: ${response.data}`);
        alert(`Last inserted id: ${response.data}`);
    }
    catch (e) {
        console.log(fullBookToAdd);
        console.log(e);

        alert('Error');
    }
});

export const updateBookAsync = createAsyncThunk('book/updateBook', async (bookToUpdate: IBook, {dispatch}) => {
    const fullBookToUpdate: IBookFull = {
        authorId: bookToUpdate.authorId,
        description: bookToUpdate.description,
        genreIds: bookToUpdate.genreIds,
        languageId: 1,
        pagesNumber: 1111,
        publisherId: 1,
        title: bookToUpdate.title,
        warehouse:
            {
                price: 66,
                quantity: 7
            },
        year: bookToUpdate.year
    };

    try {
        const response = await axios.put(`http://localhost:5000/api/books/${bookToUpdate.id}`, fullBookToUpdate);
        alert(`Updated: ${response.data}`);

        dispatch(updateBook(bookToUpdate));
    }
    catch (e) {
        console.log(`Failed to update book with id: ${bookToUpdate.id}`);
        console.log(e);
        console.log(fullBookToUpdate);

        alert('Error');
    }
});

export const deleteBookAsync = createAsyncThunk('book/deleteBook', async (id: number, {dispatch}) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/books/${id}`);
        alert(`Deleted: ${response.data}`);

        dispatch(removeBook(id));
    }
    catch (e) {
        console.log(`Failed to delete book with id: ${id}`);
        console.log(e);

        alert('Error');
    }
});



const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setBook: (state, action) => {
            state.items.push(action.payload);
        },
        updateBook: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            state.items[index] = action.payload;
        },
        removeBook: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        removeBooks: (state) => {
            state.items = [];
        },
    }
})

export default bookSlice.reducer;

export const {setBook, updateBook, removeBook, removeBooks} = bookSlice.actions;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IBook, IBookFull} from "./bookModels";
import {addBooksAsync, deleteBookAsync, fetchBookByIdAsync, fetchBooksAsync, updateBookAsync} from "./bookAPI";
import {RootState} from "../../app/store";
import {createFullBook, handleError} from "../../utils/bookHelpers";

interface IAddBookStatus {
    lastInsertedId?: number;
    isAdded?: boolean;
}

interface IBookState {
    items: IBook[];
    isLoading: boolean;
    addBookStatus: IAddBookStatus;
    isUpdated?: boolean;
    isDeleted?: boolean;
}

const initialState: IBookState = {
    items: [],
    isLoading: false,
    addBookStatus: {},
    isUpdated: undefined,
    isDeleted: undefined,
}

export const getBooks = createAsyncThunk('book/getBooks', async () => {
    try {
        const response = await fetchBooksAsync();
        return response.data;
    }
    catch (error: any) {
        handleError(error, 'Error while fetching books');
        throw error;
    }
})

export const getBookById = createAsyncThunk('book/getBookById', async (id: number) => {
    try {
        const response = await fetchBookByIdAsync(id);
        return response.data;
    }
    catch (error: any) {
        handleError(error, 'Error while fetching the book');
        throw error;
    }
})

export const addBook = createAsyncThunk('book/postBooks', async (bookToAdd: IBook) => {
    const fullBookToAdd: IBookFull = createFullBook(bookToAdd);

    try {
        const response = await addBooksAsync(fullBookToAdd);
        return response.data;
    }
    catch (error: any) {
        handleError(error, 'Error while adding the book', fullBookToAdd);
        throw error;
    }
});

export const updateBook = createAsyncThunk('book/updateBook', async (bookToUpdate: IBook) => {
    const fullBookToUpdate: IBookFull = createFullBook(bookToUpdate);

    try {
        const response = await updateBookAsync(fullBookToUpdate);
        return {
            isUpdated: response.data,
            book: bookToUpdate
        };
    }
    catch (error: any) {
        handleError(error, `Error! Failed to update book with id: ${bookToUpdate.id}`, fullBookToUpdate);
        throw  error;
    }
});

export const deleteBook = createAsyncThunk('book/deleteBook', async (id: number) => {
    try {
        const response = await deleteBookAsync(id);
        return {
            isDeleted: response.data,
            bookId: id
        };
    }
    catch (error: any) {
        handleError(error, `Failed to delete book with id: ${id}`);
        throw  error;
    }
});


const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setBook: (state, action) => {
            state.items.push(action.payload);
        },
        setBooks: (state, action) => {
            state.items = action.payload;
        },
        editBook: (state, action) => {
            const index: number = state.items.findIndex(item => item.id === action.payload.id);
            state.items[index] = action.payload;
        },
        removeBook: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        removeBooks: () => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(getBooks.pending, () => {
                return {
                    ...initialState,
                    isLoading: true,
                }
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload!;
            })
            .addCase(getBooks.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getBookById.pending, state => {
                state.isLoading = true;
            })
            .addCase(getBookById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload!);
            })
            .addCase(getBookById.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addBook.pending, state => {
                state.isLoading = true;
                state.addBookStatus = {
                    isAdded: undefined,
                    lastInsertedId: undefined,
                };
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addBookStatus = {
                    isAdded: true,
                    lastInsertedId: action.payload
                };
            })
            .addCase(addBook.rejected, state => {
                state.isLoading = false;
                state.addBookStatus = {
                    isAdded: false,
                    lastInsertedId: undefined,
                };
            })
            .addCase(updateBook.pending, (state) => {
                state.isLoading = true;
                state.isUpdated = undefined;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isUpdated = true;

                const index: number = state.items.findIndex(item => item.id === action.payload!.book.id);
                state.items[index] = action.payload!.book;
            })
            .addCase(updateBook.rejected, state => {
                state.isLoading = false;
                state.isUpdated = false;
            })
            .addCase(deleteBook.pending, state => {
                state.isLoading = true;
                state.isDeleted = undefined;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isDeleted = true;

                state.items = state.items.filter(item => item.id !== action.payload!.bookId);
            })
            .addCase(deleteBook.rejected, state => {
                state.isLoading = false;
                state.isDeleted = false;
            });
    }
})

export const {
    setBook,
    editBook,
    removeBook,
    removeBooks} = bookSlice.actions;
export const selectBooks = (state: RootState) => state.books.items;
export const selectIsBookLoading = (state: RootState) => state.books.isLoading;
export const selectAddBookStatus = (state: RootState) => state.books.addBookStatus;
export const selectIsBookUpdated = (state: RootState) => state.books.isUpdated;
export const selectIsBookDeleted = (state: RootState) => state.books.isDeleted;
export default bookSlice.reducer;
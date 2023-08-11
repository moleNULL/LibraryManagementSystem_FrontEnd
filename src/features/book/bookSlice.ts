import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IBook, IBookFull} from "./bookModels";
import {addBooksAsync, deleteBookAsync, fetchBookByIdAsync, fetchBooksAsync, updateBookAsync} from "./bookAPI";
import {RootState} from "../../app/store";
import {createFullBook, handleError} from "./bookHelpers";


const initialState = {
    items: [] as IBook[],
    isLoading: false,
};
export const getBooks = createAsyncThunk('book/getBooks', async () => {
    const response = await fetchBooksAsync();
    if (response.status === 404) {
        alert('404');
    }
    return response.data;
})

export const getBookById = createAsyncThunk('book/getBookById', async (id: number) => {
    const response = await fetchBookByIdAsync(id);
    return response.data;
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
        removeBooks: state => {
            state.items = [];
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getBooks.pending, state => {
                state.isLoading = true;
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload!;
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.isLoading = false;

                // if authorized user's email doesn't exist in Db don't show any error
                if (!action.error.message?.includes('401')) {
                    handleError(action.error, 'Error while fetching books');
                }
            })
            .addCase(getBookById.pending, state => {
                state.isLoading = true;
            })
            .addCase(getBookById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload!);
            })
            .addCase(getBookById.rejected, (state, action) => {
                state.isLoading = false;
                handleError(action.error, 'Error while fetching the book');
            })
            .addCase(addBook.pending, state => {
                state.isLoading = true;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.isLoading = false;
                alert(`Last inserted id: ${action.payload}`);
            })
            .addCase(addBook.rejected, state => {
                state.isLoading = false;
            })
            .addCase(updateBook.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload!.isUpdated) {
                    const index: number = state.items.findIndex(item => item.id === action.payload!.book.id);
                    state.items[index] = action.payload!.book;

                    alert('Updated successfully');
                }
                else {
                    alert('Failed to update the book');
                }
            })
            .addCase(updateBook.rejected, state => {
                state.isLoading = false;
            })
            .addCase(deleteBook.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload!.isDeleted) {
                    state.items = state.items.filter(item => item.id !== action.payload!.bookId);

                    alert('Deleted successfully');
                }
                else {
                    alert('Failed to delete the book');
                }
            })
            .addCase(deleteBook.rejected, state => {
                state.isLoading = false;
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
export default bookSlice.reducer;
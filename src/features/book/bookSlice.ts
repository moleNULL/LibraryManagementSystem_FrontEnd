import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IBook, IBookFull} from "./bookModels";
import {addBooksService, deleteBookService, fetchBooksService, updateBookService} from "./bookAPI";
import {RootState} from "../../app/store";
import {createFullBook, extractSimpleBook, handleError} from "./bookSliceHelpers";

const initialState = {
    items: [] as IBook[],
    selectedBookToEdit: {} as IBook
};

export const getBooksAsync = createAsyncThunk('book/getBooks', async () => {
    try {
        const response = await fetchBooksService();
        const fullBooks: IBookFull[] = response.data;

        return extractSimpleBook(fullBooks);
    }
    catch (error: any) {
        handleError(error, 'Error while fetching books');
    }
})

export const addBooksAsync = createAsyncThunk('book/postBooks', async (bookToAdd: IBook) => {
    const fullBookToAdd: IBookFull = createFullBook(bookToAdd);

    try {
        const response = await addBooksService(fullBookToAdd);
        return response.data;
    }
    catch (error: any) {
        handleError(error, 'Error while adding the book', fullBookToAdd);
    }
});

export const updateBookAsync = createAsyncThunk('book/updateBook', async (bookToUpdate: IBook, {dispatch}) => {
    const fullBookToUpdate: IBookFull = createFullBook(bookToUpdate);

    try {
        const response = await updateBookService(fullBookToUpdate);
        return {
            isUpdated: response.data,
            book: bookToUpdate
        };
    }
    catch (error: any) {
        handleError(error, `Error! Failed to update book with id: ${bookToUpdate.id}`, fullBookToUpdate);
    }
});

export const deleteBookAsync = createAsyncThunk('book/deleteBook', async (id: number, {dispatch}) => {
    try {
        const response = await deleteBookService(id);
        return {
            isDeleted: response.data,
            bookId: id
        };
    }
    catch (error: any) {
        handleError(error, `Failed to delete book with id: ${id}`);
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
        updateBook: (state, action) => {
            const index: number = state.items.findIndex(item => item.id === action.payload.id);
            state.items[index] = action.payload;
        },
        removeBook: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        removeBooks: state => {
            state.items = [];
        },
        setBookToEdit: (state, action) => {
            state.selectedBookToEdit = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getBooksAsync.fulfilled, (state, action) => {
                state.items = action.payload!;
            })
            .addCase(addBooksAsync.fulfilled, (state, action) => {
                alert(`Last inserted id: ${action.payload}`);
            })
            .addCase(updateBookAsync.fulfilled, (state, action) => {
                if (action.payload!.isUpdated) {
                    const index: number = state.items.findIndex(item => item.id === action.payload!.book.id);
                    state.items[index] = action.payload!.book;

                    alert('Updated successfully');
                }
                else {
                    alert('Failed to update the book');
                }
            })
            .addCase(deleteBookAsync.fulfilled, (state, action) => {
                if (action.payload!.isDeleted) {
                    state.items = state.items.filter(item => item.id !== action.payload!.bookId);

                    alert('Deleted successfully');
                }
                else {
                    alert('Failed to delete the book');
                }
            }
        );
    }
})

export const {
    setBook,
    updateBook,
    removeBook,
    removeBooks,
    setBookToEdit} = bookSlice.actions;
export const selectBooks = (state: RootState) => state.books.items;
export const selectBookToEdit = (state: RootState) => state.books.selectedBookToEdit;
export default bookSlice.reducer;
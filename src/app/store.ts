import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bookSlice from "../features/book/bookSlice";
import authorSlice from "../features/author/authorSlice";
import genreSlice from "../features/genre/genreSlice";

export const store = configureStore({
  reducer: {
    books: bookSlice,
    authors: authorSlice,
    genres: genreSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

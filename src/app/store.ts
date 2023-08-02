import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bookSlice, {IBook} from "../features/book/bookSlice";
import authorSlice from "../features/author/authorSlice";

export const store = configureStore({
  reducer: {
    books: bookSlice,
    authors: authorSlice,
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

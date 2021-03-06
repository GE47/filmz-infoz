import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./movies/moviesSlice";
import userSlice from "./user/userSlice";
import actorsSlice from "./actors/actorsSlice";
import bookmarksSlice from "./bookmarks/bookmarksSlice";

const store = configureStore({
  reducer: {
    [moviesSlice.name]: moviesSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [actorsSlice.name]: actorsSlice.reducer,
    [bookmarksSlice.name]: bookmarksSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

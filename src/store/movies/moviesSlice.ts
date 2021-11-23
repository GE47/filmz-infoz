import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

type status = "idle" | "loading" | "error";

interface MoviesState {
  data: {};
  status: status;
}

const initialState: MoviesState = {
  data: {},
  status: "idle",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
});

export const selectMoviesStatus = (state: RootState) => state.movies.status;
export const selectMoviesData = (state: RootState) => state.movies.data;

export default moviesSlice;

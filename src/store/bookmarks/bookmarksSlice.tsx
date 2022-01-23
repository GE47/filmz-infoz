import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { db } from "../../firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

type status = "idle" | "loading" | "error";

export interface BookmarkProps {
  id: string;
  title: string;
  poster: string | null;
  rating: number;
}

interface BookmarksState {
  data: BookmarkProps[];
  status: status;
}

const initialState: BookmarksState = {
  data: [],
  status: "idle",
};

export const getBookmarks = createAsyncThunk<
  BookmarksState["data"],
  { id: string }
>("bookmarks/getBookmarks", async ({ id }) => {
  const docRef = doc(db, "bookmarks", id);
  const docSnapShot = await getDoc(docRef);
  const result = docSnapShot.data()?.movies;

  return result;
});

export const addMovieBookmark = createAsyncThunk<
  BookmarkProps,
  BookmarkProps & { userId: string }
>(
  "bookmarks/addMovieBookmark",
  async ({ id, rating, poster, title, userId }) => {
    const docRef = doc(db, "bookmarks", userId);
    const data = { id, rating, poster, title };

    await setDoc(
      docRef,
      {
        movies: arrayUnion(data),
      },
      { merge: true }
    );

    return data;
  }
);

export const removeMovieBookmark = createAsyncThunk<
  string,
  BookmarkProps & { userId: string }
>(
  "bookmarks/removeMovieBookmark",
  async ({ title, poster, rating, id, userId }) => {
    const docRef = doc(db, "bookmarks", userId);
    const data = { id, rating, poster, title };

    await setDoc(
      docRef,
      {
        movies: arrayRemove(data),
      },
      { merge: true }
    );

    return id;
  }
);

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    clearBookmarks: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBookmarks.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getBookmarks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "idle";
    });

    builder.addCase(getBookmarks.rejected, (state) => {
      state.status = "error";
    });

    builder.addCase(addMovieBookmark.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(addMovieBookmark.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.status = "idle";
    });

    builder.addCase(addMovieBookmark.rejected, (state) => {
      state.status = "error";
    });

    builder.addCase(removeMovieBookmark.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(removeMovieBookmark.fulfilled, (state, action) => {
      state.data = state.data.filter(
        (bookmark) => bookmark.id !== action.payload
      );
      state.status = "idle";
    });

    builder.addCase(removeMovieBookmark.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { clearBookmarks } = bookmarksSlice.actions;

export const selectBookmarks = (state: RootState) => state.bookmarks;

export default bookmarksSlice;

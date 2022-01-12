import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as logOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { RootState } from "..";

export interface UserState {
  data: {
    uid: string;
    email: string;
  } | null;
  status: "idle" | "loading" | "error";
  errorMessage: string;
}

interface UserInput {
  email: string;
  password: string;
}

const initialState: UserState = {
  data: null,
  status: "idle",
  errorMessage: "",
};

const getAuthErrorMessage = (code: string) => {
  switch (code) {
    case "auth/user-not-found":
      return "User does not exist";
    case "auth/email-already-exists":
      return "Email already exists";
    case "auth/invalid-credential":
      return "The credentials you entered are invalid";
    case "auth/invalid-email":
      return "Email is invalid";
    case "auth/invalid-password":
      return "Password is invalid";
    case "auth/wrong-password":
      return "Password is invalid";
    default:
      return "Something went wrong, please try again later.";
  }
};

export const singInWithEmail = createAsyncThunk<UserState["data"], UserInput>(
  "user/signin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const request = await signInWithEmailAndPassword(auth, email, password);

      return {
        uid: request.user.uid,
        email: email,
      };
    } catch (e: any) {
      return rejectWithValue(getAuthErrorMessage(e.code));
    }
  }
);

export const registerWithEmail = createAsyncThunk<UserState["data"], UserInput>(
  "user/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const request = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = request.user.uid;

      await setDoc(doc(db, "bookmarks", uid), { movies: [] });

      return {
        uid,
        email: email,
      };
    } catch (e: any) {
      return rejectWithValue(getAuthErrorMessage(e.code));
    }
  }
);

export const signOut = createAsyncThunk<void>("user/signOut", async () => {
  await logOut(auth);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserCredentials: (state, action) => {
      const user = action.payload as UserState["data"];

      state.status = "loading";

      state.data = user;

      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(singInWithEmail.pending, (state) => {
      state.status = "loading";
      state.errorMessage = "";
    });

    builder.addCase(singInWithEmail.fulfilled, (state, action) => {
      state.status = "idle";
      state.errorMessage = "";
      state.data = action.payload;
    });

    builder.addCase(singInWithEmail.rejected, (state, action) => {
      state.status = "error";
      state.errorMessage = action.payload as string;
    });

    builder.addCase(registerWithEmail.pending, (state) => {
      state.status = "loading";
      state.errorMessage = "";
    });

    builder.addCase(registerWithEmail.fulfilled, (state, action) => {
      state.status = "idle";
      state.errorMessage = "";
      state.data = action.payload;
    });

    builder.addCase(registerWithEmail.rejected, (state, action) => {
      state.status = "error";
      state.errorMessage = action.payload as string;
    });

    builder.addCase(signOut.pending, (state) => {
      state.status = "loading";
      state.errorMessage = "";
    });

    builder.addCase(signOut.fulfilled, (state) => {
      state.status = "idle";
      state.errorMessage = "";
      state.data = null;
    });

    builder.addCase(signOut.rejected, (state, action) => {
      state.status = "error";
      state.errorMessage = action.payload as string;
    });
  },
});

export const { updateUserCredentials } = userSlice.actions;
export const selectUserData = (state: RootState) => state.user.data;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserMessage = (state: RootState) => state.user.errorMessage;

export default userSlice;

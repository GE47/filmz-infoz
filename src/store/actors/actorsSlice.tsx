import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ACTORS, API_KEY, BASE_URL } from "../../constants";
import { MoviesCardProps } from "../movies/moviesSlice";

type status = "idle" | "loading" | "error";

export interface ActorCardProps {
  name: string;
  id: number;
  poster: string | null;
}

export interface ActorProps {
  name: string;
  poster: string | null;
  bio: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
}

interface ActorsState {
  actorsList: {
    data: {
      page: number;
      results: ActorCardProps[];
      totalPages: number;
    };
    status: status;
  };

  actorDetails: {
    data: ActorProps;
    status: status;
  };
  actorParticipations: {
    data: MoviesCardProps[];
    status: status;
  };
}

const initialState: ActorsState = {
  actorsList: {
    data: {
      page: 1,
      results: [],
      totalPages: 1,
    },
    status: "idle",
  },

  actorDetails: {
    data: {
      name: "",
      poster: null,
      birthday: null,
      deathday: null,
      bio: "",
      gender: 1,
    },
    status: "idle",
  },
  actorParticipations: {
    data: [],
    status: "idle",
  },
};

export const getPopularActors = createAsyncThunk<
  ActorsState["actorsList"]["data"],
  { page: number }
>("actors/getPopularActors", async ({ page }) => {
  const request = await fetch(`${ACTORS}&page=${page}`);
  const data = await request.json();

  const results = data.results.map((result: any) => ({
    name: result.name,
    poster: result.profile_path,
    id: result.id,
  }));

  return {
    page: data.page,
    results,
    totalPages: data.total_pages,
  };
});

export const getActorDetails = createAsyncThunk<ActorProps, { id: string }>(
  "actors/getActorDetails",
  async ({ id }) => {
    const request = await fetch(`${BASE_URL}/person/${id}${API_KEY}`);
    const data = await request.json();

    return {
      birthday: data.birthday,
      deathday: data.deathday,
      name: data.name,
      bio: data.biography,
      poster: data.profile_path,
      gender: data.gender,
    };
  }
);

export const getActorParticipations = createAsyncThunk<
  MoviesCardProps[],
  { id: string }
>("actors/getActorParticipations", async ({ id }) => {
  const request = await fetch(
    `${BASE_URL}/person/${id}/movie_credits${API_KEY}`
  );
  const data = await request.json();

  const results = data.cast.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    backdrop: movie.backdrop_path,
    poster: movie.poster_path,
    rating: movie.vote_average,
  }));

  return results;
});

const actorsSlice = createSlice({
  name: "actors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPopularActors.pending, (state) => {
      state.actorsList.status = "loading";
    });

    builder.addCase(getPopularActors.fulfilled, (state, action) => {
      if (action.payload.page === 1) {
        state.actorsList.data = action.payload;
      } else {
        state.actorsList.data.page = action.payload.page;
        state.actorsList.data.totalPages = action.payload.totalPages;
        state.actorsList.data.results.push(...action.payload.results);
      }

      state.actorsList.status = "idle";
    });

    builder.addCase(getPopularActors.rejected, (state) => {
      state.actorsList.status = "error";
    });

    builder.addCase(getActorDetails.pending, (state) => {
      state.actorDetails.status = "loading";
      state.actorDetails.data = {
        name: "",
        gender: 1,
        poster: null,
        bio: "",
        deathday: null,
        birthday: null,
      };
    });

    builder.addCase(getActorDetails.fulfilled, (state, action) => {
      state.actorDetails.data = action.payload;
      state.actorDetails.status = "idle";
    });

    builder.addCase(getActorDetails.rejected, (state) => {
      state.actorDetails.status = "error";
    });

    builder.addCase(getActorParticipations.pending, (state) => {
      state.actorParticipations.status = "loading";
    });

    builder.addCase(getActorParticipations.fulfilled, (state, action) => {
      state.actorParticipations.data = action.payload;
      state.actorParticipations.status = "idle";
    });

    builder.addCase(getActorParticipations.rejected, (state) => {
      state.actorParticipations.status = "error";
    });
  },
});

export const selectActors = (state: RootState) => state.actors.actorsList;
export const selectActorDetails = (state: RootState) =>
  state.actors.actorDetails;
export const selectActorParticipations = (state: RootState) =>
  state.actors.actorParticipations;

export default actorsSlice;

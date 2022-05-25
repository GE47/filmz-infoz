import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  NOW_PLAYING,
  POPULAR_MOVIES,
  TOP_RATED,
  GENRE_LIST,
  API_KEY,
  BASE_URL,
  MOVIES_BY_GENRE,
  MOVIES_BY_KEYWORD,
} from "../../constants";
import { findWhere } from "underscore";
import { ActorCardProps } from "../actors/actorsSlice";

type status = "idle" | "loading" | "error";

export interface MainCarouselProps {
  poster: string | null;
  id: number;
  title: string;
}

export interface MoviesCardProps {
  poster: string | null;
  backdrop: string | null;
  id: string;
  title: string;
  rating: number;
}

interface ResultPagesProps {
  data: {
    page: number;
    results: MoviesCardProps[];
    totalPages: number;
  };
  status: status;
}

export interface MovieDetailsProps {
  title: string;
  poster: string | null;
  backdrop: string | null;
  rating: number;
  genres: { name: string; id: number }[];
  length: number;
  ratingCount: number;
  trailer?: string;
  description: string;
}

interface MoviesState {
  mainCarousel: {
    data: MainCarouselProps[];
    status: status;
  };
  popularSlider: {
    data: MoviesCardProps[];
    status: status;
  };
  topSlider: {
    data: MoviesCardProps[];
    status: status;
  };
  movieList: ResultPagesProps;
  searchList: {
    data: MoviesCardProps[];
    status: status;
  };

  genres: {
    data: { name: string; id: number }[];
    status: status;
  };

  movieDetails: {
    data: MovieDetailsProps;
    status: status;
  };

  movieTopCast: {
    data: ActorCardProps[];
    status: status;
  };

  relatedMovies: {
    data: MoviesCardProps[];
    status: status;
  };
}

const initialState: MoviesState = {
  mainCarousel: {
    data: [],
    status: "loading",
  },
  popularSlider: {
    data: [],
    status: "loading",
  },
  topSlider: {
    data: [],
    status: "loading",
  },

  movieList: {
    data: {
      page: 1,
      results: [],
      totalPages: 1,
    },
    status: "idle",
  },

  searchList: {
    data: [],
    status: "idle",
  },

  genres: {
    data: [],
    status: "idle",
  },
  movieDetails: {
    data: {
      title: "",
      genres: [],
      poster: null,
      backdrop: null,
      rating: 0,
      length: 0,
      ratingCount: 0,
      trailer: "",
      description: "",
    },
    status: "idle",
  },
  movieTopCast: {
    data: [],
    status: "loading",
  },
  relatedMovies: {
    data: [],
    status: "loading",
  },
};

export const getMainCarouselMovies = createAsyncThunk(
  "movies/mainCarousel",
  async () => {
    const request = await fetch(`${NOW_PLAYING}&page=1`);
    const data = await request.json();

    const result = data.results.map((res: any) => ({
      poster: res.backdrop_path,
      id: res.id,
      title: res.title,
    }));

    return result;
  }
);

export const getPopularSlides = createAsyncThunk(
  "movies/getPopularSlides",
  async () => {
    const request = await fetch(`${POPULAR_MOVIES}&page=1`);
    const data = await request.json();

    const results = data.results.slice(0, 10).map((res: any) => ({
      poster: res.poster_path,
      id: res.id,
      title: res.title,
      rating: res.vote_average,
    }));

    return results;
  }
);

export const getTopRatedSlides = createAsyncThunk(
  "movies/getTopRatedSlides",
  async () => {
    const request = await fetch(`${TOP_RATED}&page=1`);
    const data = await request.json();

    const results = data.results.slice(0, 10).map((res: any) => ({
      poster: res.poster_path,
      backdrop: res.backdrop_path,
      id: res.id,
      title: res.title,
      rating: res.vote_average,
    }));
    return results;
  }
);

export const getGenres = createAsyncThunk<
  { name: string; id: number }[],
  { language: string }
>("movies/getGenres", async ({ language }) => {
  const request = await fetch(`${GENRE_LIST}&language=${language}`);
  const data = await request.json();

  return data.genres;
});

export const getMoviesByGenres = createAsyncThunk<
  ResultPagesProps["data"],
  { type: string; page?: number }
>("movies/getMoviesByGenres", async ({ type, page = 1 }) => {
  const request = await fetch(
    `${MOVIES_BY_GENRE}&page=${page}&with_genres=${type}`
  );

  const data = await request.json();

  const results = data.results.map((res: any) => ({
    poster: res.poster_path,
    backdrop: res.backdrop_path,
    id: res.id,
    title: res.title,
    rating: res.vote_average,
  }));

  return {
    page: data.page,
    results: results,
    totalPages: data.total_pages,
  };
});

export const getMoviesByKeywords = createAsyncThunk<
  ResultPagesProps["data"],
  { value: string; page?: number }
>("movies/getMoviesByKeywords", async ({ value, page = 1 }) => {
  const request = await fetch(
    `${MOVIES_BY_KEYWORD}&page=${page}&query=${value}`
  );

  const data = await request.json();

  const results = data.results.map((res: any) => ({
    poster: res.poster_path,
    backdrop: res.backdrop_path,
    id: res.id,
    title: res.title,
    rating: res.vote_average,
  }));

  return {
    page: data.page,
    results: results,
    totalPages: data.total_pages,
  };
});

export const getMoviesOnSearch = createAsyncThunk<
  MoviesCardProps[],
  { value: string }
>("movies/getMoviesOnSearch", async ({ value }) => {
  if (!value) return [];

  const request = await fetch(`${MOVIES_BY_KEYWORD}&page=1&query=${value}`);

  const data = await request.json();

  const results = data.results.slice(0, 10).map((res: any) => ({
    poster: res.poster_path,
    backdrop: res.backdrop_path,
    id: res.id,
    title: res.title,
    rating: res.vote_average,
  }));

  return results;
});

export const getMovieList = createAsyncThunk<
  ResultPagesProps["data"],
  { type: string; page?: number }
>("movies/getMovieList", async ({ page = 1, type }) => {
  const request = await fetch(
    `${BASE_URL}/movie/${type}${API_KEY}&page=${page}`
  );

  const data = await request.json();

  const results = data.results.map((res: any) => ({
    poster: res.poster_path,
    backdrop: res.backdrop_path,
    id: res.id,
    title: res.title,
    rating: res.vote_average,
  }));

  return {
    page: data.page,
    results: results,
    totalPages: data.total_pages,
  };
});

export const getMovieDetails = createAsyncThunk<
  MovieDetailsProps,
  { id: string }
>("movies/getMovieDetails", async ({ id }) => {
  const request = await fetch(`${BASE_URL}/movie/${id}${API_KEY}`);
  const data = await request.json();

  return {
    id: data.id,
    title: data.title,
    genres: data.genres,
    rating: data.vote_average,
    backdrop: data.backdrop_path,
    poster: data.poster_path,
    length: data.runtime,
    ratingCount: data.vote_count,
    description: data.overview,
  };
});

export const getMovieTrailer = createAsyncThunk<string, { id: string }>(
  "movies/getMovieTrailer",
  async ({ id }) => {
    const request = await fetch(`${BASE_URL}/movie/${id}/videos${API_KEY}`);
    const data = await request.json();

    const result = findWhere(data.results, {
      site: "YouTube",
      type: "Trailer",
    });

    return result.key;
  }
);

export const getMovieTopCast = createAsyncThunk<
  ActorCardProps[],
  { id: string }
>("movies/getMovieTopCast", async ({ id }) => {
  const request = await fetch(`${BASE_URL}/movie/${id}/credits${API_KEY}`);
  const data = await request.json();

  const results = data.cast
    .filter((result: any) => result.known_for_department === "Acting")
    .slice(0, 10)
    .map((result: any) => ({
      name: result.name,
      id: result.id,
      poster: result.profile_path,
    }));

  return results;
});

export const getRelatedMovies = createAsyncThunk<
  MoviesCardProps[],
  { id: string }
>("movies/getRelatedMovies", async ({ id }) => {
  const request = await fetch(`${BASE_URL}/movie/${id}/similar${API_KEY}`);
  const data = await request.json();

  const results = data.results.slice(0, 10).map((result: any) => ({
    poster: result.poster_path,
    backdrop: result.backdrop_path,
    title: result.title,
    rating: result.vote_average,
    id: result.id,
  }));

  return results;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearSearchList: (state) => {
      state.searchList.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMainCarouselMovies.pending, (state) => {
      state.mainCarousel.status = "loading";
    });

    builder.addCase(getMainCarouselMovies.fulfilled, (state, action) => {
      state.mainCarousel.status = "idle";
      state.mainCarousel.data = action.payload;
    });

    builder.addCase(getMainCarouselMovies.rejected, (state) => {
      state.mainCarousel.status = "error";
    });

    builder.addCase(getPopularSlides.pending, (state) => {
      state.popularSlider.status = "loading";
    });

    builder.addCase(getPopularSlides.fulfilled, (state, action) => {
      state.popularSlider.status = "idle";
      state.popularSlider.data = action.payload;
    });

    builder.addCase(getPopularSlides.rejected, (state) => {
      state.popularSlider.status = "error";
    });

    builder.addCase(getTopRatedSlides.pending, (state) => {
      state.topSlider.status = "loading";
    });

    builder.addCase(getTopRatedSlides.fulfilled, (state, action) => {
      state.topSlider.status = "idle";
      state.topSlider.data = action.payload;
    });

    builder.addCase(getTopRatedSlides.rejected, (state) => {
      state.topSlider.status = "error";
    });

    builder.addCase(getMovieList.pending, (state, action) => {
      state.movieList.status = "loading";

      if (action.meta.arg.page === 1) {
        state.movieList.data.results = [];
      }
    });

    builder.addCase(getMovieList.fulfilled, (state, action) => {
      if (action.payload.page === 1) {
        state.movieList.data = action.payload;
      } else {
        state.movieList.data.page = action.payload.page;
        state.movieList.data.totalPages = action.payload.totalPages;
        state.movieList.data.results.push(...action.payload.results);
      }

      state.movieList.status = "idle";
    });

    builder.addCase(getMovieList.rejected, (state) => {
      state.movieList.status = "error";
    });

    builder.addCase(getGenres.pending, (state) => {
      state.genres.status = "loading";
    });

    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres.status = "idle";
      state.genres.data = action.payload;
    });

    builder.addCase(getGenres.rejected, (state) => {
      state.genres.status = "error";
    });

    builder.addCase(getMoviesByGenres.pending, (state, action) => {
      state.movieList.status = "loading";

      if (action.meta.arg.page === 1) {
        state.movieList.data.results = [];
      }
    });

    builder.addCase(getMoviesByGenres.fulfilled, (state, action) => {
      if (action.payload.page === 1) {
        state.movieList.data = action.payload;
      } else {
        state.movieList.data.page = action.payload.page;
        state.movieList.data.totalPages = action.payload.totalPages;
        state.movieList.data.results.push(...action.payload.results);
      }

      state.movieList.status = "idle";
    });

    builder.addCase(getMoviesByGenres.rejected, (state) => {
      state.movieList.status = "error";
    });

    builder.addCase(getMoviesByKeywords.pending, (state, action) => {
      state.movieList.status = "loading";

      if (action.meta.arg.page === 1) {
        state.movieList.data.results = [];
      }
    });

    builder.addCase(getMoviesByKeywords.fulfilled, (state, action) => {
      if (action.payload.page === 1) {
        state.movieList.data = action.payload;
      } else {
        state.movieList.data.page = action.payload.page;
        state.movieList.data.totalPages = action.payload.totalPages;
        state.movieList.data.results.push(...action.payload.results);
      }

      state.movieList.status = "idle";
    });

    builder.addCase(getMoviesByKeywords.rejected, (state) => {
      state.movieList.status = "error";
    });

    builder.addCase(getMoviesOnSearch.pending, (state) => {
      state.searchList.status = "loading";
    });

    builder.addCase(getMoviesOnSearch.fulfilled, (state, action) => {
      state.searchList.data = action.payload;
      state.searchList.status = "idle";
    });

    builder.addCase(getMoviesOnSearch.rejected, (state) => {
      state.searchList.status = "error";
    });

    builder.addCase(getMovieDetails.pending, (state) => {
      state.movieDetails.status = "loading";
      state.movieDetails.data = {
        genres: [],
        title: "",
        length: 0,
        poster: "",
        backdrop: "",
        rating: 0,
        ratingCount: 0,
        description: "",
      };
    });

    builder.addCase(getMovieDetails.fulfilled, (state, action) => {
      state.movieDetails.data = action.payload;
      state.movieDetails.status = "idle";
    });

    builder.addCase(getMovieDetails.rejected, (state) => {
      state.movieDetails.status = "error";
    });

    builder.addCase(getMovieTrailer.pending, (state) => {
      state.movieDetails.status = "loading";
      state.movieDetails.data.trailer = "";
    });

    builder.addCase(getMovieTrailer.fulfilled, (state, action) => {
      state.movieDetails.data.trailer = action.payload;
      state.movieDetails.status = "idle";
    });

    builder.addCase(getMovieTrailer.rejected, (state) => {
      state.movieDetails.status = "idle";
    });

    builder.addCase(getMovieTopCast.pending, (state) => {
      state.movieTopCast.status = "loading";
    });

    builder.addCase(getMovieTopCast.fulfilled, (state, action) => {
      state.movieTopCast.data = action.payload;
      state.movieTopCast.status = "idle";
    });

    builder.addCase(getMovieTopCast.rejected, (state) => {
      state.movieTopCast.status = "error";
    });

    builder.addCase(getRelatedMovies.pending, (state) => {
      state.relatedMovies.status = "loading";
    });

    builder.addCase(getRelatedMovies.fulfilled, (state, action) => {
      state.relatedMovies.data = action.payload;
      state.relatedMovies.status = "idle";
    });

    builder.addCase(getRelatedMovies.rejected, (state) => {
      state.relatedMovies.status = "error";
    });
  },
});

export const { clearSearchList } = moviesSlice.actions;

export const selectCarouselMovies = (state: RootState) =>
  state.movies.mainCarousel;
export const selectPopularSlider = (state: RootState) =>
  state.movies.popularSlider;
export const selectTopSlider = (state: RootState) => state.movies.topSlider;
export const selectMovieList = (state: RootState) => state.movies.movieList;
export const selectGenres = (state: RootState) => state.movies.genres;
export const selectSearchList = (state: RootState) => state.movies.searchList;
export const selectMovieDetails = (state: RootState) =>
  state.movies.movieDetails;
export const selectRelatedMovies = (state: RootState) =>
  state.movies.relatedMovies;
export const selectMovieTopCast = (state: RootState) =>
  state.movies.movieTopCast;

export default moviesSlice;

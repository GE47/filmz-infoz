export const API_KEY = `?api_key=${process.env.REACT_APP_API_KEY}`;
export const BASE_URL = "https://api.themoviedb.org/3";

export const POPULAR_MOVIES = `${BASE_URL}/movie/popular${API_KEY}`;
export const NOW_PLAYING = `${BASE_URL}/movie/now_playing${API_KEY}`;
export const TOP_RATED = `${BASE_URL}/movie/top_rated${API_KEY}`;
export const GENRE_LIST = `${BASE_URL}/genre/movie/list${API_KEY}`;
export const MOVIES_BY_GENRE = `${BASE_URL}/discover/movie${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate`;
export const MOVIES_BY_KEYWORD = `${BASE_URL}/search/movie${API_KEY}`;
export const ACTORS = `${BASE_URL}/person/popular${API_KEY}`;

export const MOVIE_ITEMS = [
  { name: "Popular", id: "popular" },
  { name: "Top Rated", id: "top_rated" },
  { name: "Upcoming", id: "upcoming" },
  { name: "Now Playing", id: "now_playing" },
];

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Layout from "./components/Layout";
import {
  Home,
  Actor,
  Actors,
  Bookmarks,
  Genre,
  Movie,
  Movies,
  SignIn,
  Register,
  Search,
} from "./pages";
import LoadingIndicator from "./components/LoadingIndicator";
import { auth } from "./firebase";
import {
  selectUserData,
  selectUserStatus,
  updateUserCredentials,
} from "./store/user/userSlice";
import {
  getMainCarouselMovies,
  getPopularSlides,
  getTopRatedSlides,
  getGenres,
  selectGenres,
} from "./store/movies/moviesSlice";
import NotFound from "./components/404";
import { getBookmarks, clearBookmarks } from "./store/bookmarks/bookmarksSlice";

const App = () => {
  const dispatch = useDispatch();
  const userLoadingStatus = useSelector(selectUserStatus);
  const genres = useSelector(selectGenres);
  const currentUser = useSelector(selectUserData);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(updateUserCredentials({ email: user.email, uid: user.uid }));
      }
    });

    dispatch(getMainCarouselMovies());
    dispatch(getPopularSlides());
    dispatch(getTopRatedSlides());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres({ language: currentLanguage }));
  }, [dispatch, currentLanguage]);

  useEffect(() => {
    if (currentUser) {
      dispatch(getBookmarks({ id: currentUser.uid }));
    } else {
      dispatch(clearBookmarks());
    }
  }, [dispatch, currentUser]);

  if (userLoadingStatus === "loading" || genres.status === "loading")
    return <LoadingIndicator />;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/actors" element={<Actors />} />

        <Route path="/bookmarks" element={<Bookmarks />} />

        <Route path="/movies/:type" element={<Movies />} />

        <Route path="/genre/:id" element={<Genre />} />

        <Route path="/movie/:id" element={<Movie />} />

        <Route path="/actor/:id" element={<Actor />} />

        <Route path="/signin" element={<SignIn />} />

        <Route path="/register" element={<Register />} />

        <Route path="/search" element={<Search />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;

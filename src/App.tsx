import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

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
  selectUserStatus,
  updateUserCredentials,
} from "./store/user/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const userLoadingStatus = useSelector(selectUserStatus);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(updateUserCredentials({ email: user.email, uid: user.uid }));
      }
    });
  }, [dispatch]);

  if (userLoadingStatus === "loading") return <LoadingIndicator />;

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
      </Routes>
    </Layout>
  );
};

export default App;

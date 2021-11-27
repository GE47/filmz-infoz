import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

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

const App = () => {
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

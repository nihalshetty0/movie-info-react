import { useEffect, useState } from "react";

import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Layout/Navbar";
import DiscoverBar from "./components/Layout/DiscoverBar";
import Home from "./components/Pages/Home";
import Search from "./components/Pages/Search";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  // const [genreChoice, setGenreChoice] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=490daab0f9ce767ec92bfabd7c11cb1e`
      );
      setPopularMovies(res.data.results);
    })();
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <div className='container pt-4'>
          <Routes>
            <Route
              exact
              path='/home'
              element={<Home popularMovies={popularMovies} />}
            ></Route>
            <Route exact path='/search' element={<Search />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;

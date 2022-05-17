import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Layout/Navbar";
import Home from "./components/Pages/Home";
import Search from "./components/Pages/Search";
import Movie from "./components/Pages/Movie";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <div className='container pt-4'>
          <Routes>
            <Route
              exact
              path='/'
              element={<Navigate to='/home?page=1' />}
            ></Route>
            <Route
              exact
              path='/home'
              element={<Home popularMovies={[]} />}
            ></Route>
            <Route exact path='/search' element={<Search />}></Route>
            {/* <Route exact path='/search' element={<Search />}></Route> */}
            <Route exact path='/movie/:id' element={<Movie />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;

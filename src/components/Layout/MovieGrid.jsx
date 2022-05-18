import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import empty from "../../empty.png";

const memoScroll = () => {
  sessionStorage.setItem("windowScroll", window.scrollY);
};

const MovieGrid = ({ movies }) => {
  // memorize position between page switch
  useEffect(() => {
    const lastScrollPosition = sessionStorage.getItem("windowScroll");
    setTimeout(() => {
      window.scrollTo(0, lastScrollPosition);
    }, 100);
    window.addEventListener("scroll", memoScroll);
    return () => {
      window.removeEventListener("scroll", memoScroll);
    };
  }, []);

  // Result empty
  if (movies.length === 0) {
    return (
      <>
        <div
          className='d-flex justify-content-center '
          style={{ height: "200px" }}
        >
          <img src={empty} alt='Empty' />
        </div>
        <h6 className='text-center fw-semibold'>
          Nothing to show for. Try something else
        </h6>
      </>
    );
  }

  return (
    <>
      <div className='row row-cols-2 row-cols-sm-3 row-cols-md-4'>
        {movies.map((movie) => {
          return (
            <div className='col mb-3' key={movie.id}>
              <Link to={`/movie/${movie.id}`} className='' key={movie.id}>
                <div className='card shadow-lg h-100'>
                  <MoviePoster poster_path={movie.poster_path} />
                  <MovieInfo movie={movie} />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MovieGrid;

const MoviePoster = ({ poster_path }) => {
  return (
    <>
      {poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          className='card-img-top h-100 border'
          alt=''
        />
      ) : (
        <img className='card-img-top h-100 border' alt='' />
      )}
    </>
  );
};

const MovieInfo = ({ movie }) => {
  return (
    <div className='card-body m-0 p-2'>
      <p className='mb-1 text-dark fw-bold fs-6'>{movie.original_title}</p>
      <small className='text-muted fw-semibold'>
        {movie.vote_average * 10}%
      </small>
    </div>
  );
};

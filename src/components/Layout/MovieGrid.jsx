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
            // <div  key={movie.id}>
            <Link
              to={`/movie/${movie.id}`}
              className='col mb-4 '
              key={movie.id}
            >
              <div className='card rounded-4 shadow-lg h-100 m-1 border-0 relative'>
                <MoviePoster movie={movie} />
                <div
                  style={{
                    position: "absolute",
                    height: "20px",
                    // width: "100px",
                    padding:'5px 0px 5px 0px'
                  }}
                >
                  <small className='fw-semibold bg-primary text-dark p-1 rounded-1'>
                    {movie.vote_average}
                  </small>
                </div>
              </div>
            </Link>
            // </div>
          );
        })}
      </div>
    </>
  );
};

export default MovieGrid;

const MoviePoster = ({ movie }) => {
  return (
    <>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className='card-img-top h-100 rounded-4'
          alt=''
        />
      ) : (
        <>
          <img className='card-img-top h-100 rounded-4' alt='' />
          <div
            style={{
              position: "absolute",
              textDecoration: "none",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <h3 className='text-dark fw-semibold'>{movie.title}</h3>
          </div>
        </>
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

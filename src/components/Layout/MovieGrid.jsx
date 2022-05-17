import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const MovieGrid = ({ movies }) => {

  const memoScroll = () => {
    sessionStorage.setItem("windowScroll", window.scrollY);
  };
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

  return (
    <>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-4'>
        {movies.map((movie) => {
          return (
            <Link
              // href={`/movie/${movie.id}`}
              to={`/movie/${movie.id}`}
              // onClick={()=>onClick(movie.id)}
              key={movie.id}
            >
              <div className='col gy-3 ' key={movie.id}>
                <div className='card mb-3 '>
                  <img
                    style={{ border: "1px solid red" }}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className='card-img-top '
                    alt='...'
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>{movie.original_title}</h5>
                    <p className='card-text'>{movie.vote_average}/10</p>
                    <p className='card-text'>
                      <small className='text-muted'>{movie.release_date}</small>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default MovieGrid;

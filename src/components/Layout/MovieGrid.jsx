import React from "react";
import { Link } from "react-router-dom";

const MovieGrid = ({ movies }) => {
  return (
    <>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-4'>
        {movies.map((movie) => {
          return (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className='col gy-3' key={movie.id}>
              <div className='card mb-3' style={{height:'100%'}}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className='card-img-top'
                  alt='...'
                />
                <div className='card-body'>
                  <h5 className='card-title'>{movie.original_title}</h5>
                  <p className='card-text'>
                    {movie.vote_average}/10
                  </p>
                  <p className='card-text'>
                    <small className='text-muted'>
                    {movie.release_date}
                    </small>
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

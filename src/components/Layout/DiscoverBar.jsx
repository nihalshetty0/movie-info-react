import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useSearchParams } from "react-router-dom";

const DiscoverBar = () => {
  let navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();

  const [genreList, setGenreList] = useState([]);
  const [genreChoice, setGenreChoice] = useState([]);


  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=490daab0f9ce767ec92bfabd7c11cb1e`
      );
      setGenreList(res.data.genres);
    })();

    const selectedGenre = searchParams.get("with_genre") 
    if(selectedGenre !== null) setGenreChoice([...selectedGenre.split(',')])
  }, []);

  const toggleGenre = (e) => {
    const id = e.target.getAttribute("data-genre-id");
    if (genreChoice.indexOf(id) === -1) {
      setGenreChoice([...genreChoice, id]);
    } else {
      setGenreChoice([...genreChoice.filter((g) => g !== id)]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (genreChoice.length > 0) {
      navigate(`/home?with_genre=${genreChoice.join(",")}`);
    } else {
      navigate(`/home`);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='accordion accordion-flush' id='accordionFlushExample'>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='flush-headingOne'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#flush-collapseOne'
              aria-expanded='false'
              aria-controls='flush-collapseOne'
            >
              Filter by genre
            </button>
          </h2>
          <div
            id='flush-collapseOne'
            className='accordion-collapse collapse'
            aria-labelledby='flush-headingOne'
            data-bs-parent='#accordionFlushExample'
          >
            <div className='accordion-body'>
              <div className='row row-cols-auto'>
                {genreList.map((genre) => {
                  return (
                    <div
                      className={`col ${
                        genreChoice.indexOf(genre.id.toString()) > -1
                          ? "option-active"
                          : ""
                      }`}
                      key={genre.id}
                      data-genre-id={genre.id}
                      onClick={toggleGenre}
                    >
                      {genre.name}
                    </div>
                  );
                })}
              </div>
              <button type='submit' className='btn btn-primary w-100'>
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DiscoverBar;

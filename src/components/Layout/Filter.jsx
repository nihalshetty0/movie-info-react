import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useSearchParams } from "react-router-dom";

const Fitler = () => {
  let navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();

  const [genreList, setGenreList] = useState([]);
  const [genreChoice, setGenreChoice] = useState([]);

  useEffect(() => {
    (async () => {
      // get list of all genre
      const res = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=490daab0f9ce767ec92bfabd7c11cb1e`
      );
      setGenreList(res.data.genres);
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const selectedGenre = searchParams.get("with_genre");
    if (selectedGenre !== null) setGenreChoice([...selectedGenre.split(",")]);
    else setGenreChoice([]);
    // const selectedGenre = searchParams.get("with_genre");
  }, [searchParams]);

  const toggleGenre = (e) => {
    const id = e.target.getAttribute("data-genre-id");
    if (genreChoice.indexOf(id) === -1) {
      // if genre not selected, then add to users genre preference
      setGenreChoice([...genreChoice, id]);
    } else {
      // if genre already in user genre preference, remove it
      setGenreChoice([...genreChoice.filter((g) => g !== id)]);
    }
  };

  const onSubmit = () => {
    if (genreChoice.length > 0) {
      setSearchParams({ with_genre: genreChoice.join(","), page: 1 });
    } else {
      navigate(`/home`);
    }
  };

  const clearFilter = () => {
    setGenreChoice([]);
    navigate("/home");
  };

  return (
    // Accordian
    <div
      className='accordion accordion-flush border mb-4'
      id='accordionFlushExample'
    >
      <div className='accordion-item'>
        {/* Title */}
        <h2 className='accordion-header' id='flush-headingOne'>
          <button
            id='chooseGenre'
            className='accordion-button collapsed fw-bold fs-6 p-2 text-primary'
            style={{ backgroundColor: 'rgb(9, 28, 37, 1)' }}
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#flush-collapseOne'
          >
            Filter
            {searchParams.get("with_genre") !== null && (
              <div
                className='border border-primary ms-3 fw-normal p-1 rounded text-primary'
                style={{
                  fontSize: ".5em",
                }}
              >
                applied
              </div>
            )}
          </button>
        </h2>

        <div
          id='flush-collapseOne'
          className='accordion-collapse collapse text-primary bg-light'
          aria-labelledby='flush-headingOne'
          data-bs-parent='#accordionFlushExample'
        >
          {/* Body */}
          <div className='accordion-body'>
            {/* Genre selection  */}
            <GenreList
              genreList={genreList}
              genreChoice={genreChoice}
              toggleGenre={toggleGenre}
            />

            <div className='row'>
              {/* Clear btn */}
              <div
                onClick={clearFilter}
                className='col mx-2 btn btn-outline-primary w-100'
              >
                Clear
              </div>

              {/* Submit button */}
              <button
                onClick={onSubmit}
                type='submit'
                className='col mx-2 btn btn-primary w-100'
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GenreList = ({ genreList, genreChoice, toggleGenre }) => {
  return (
    <div className='row row-cols-auto mb-4'>
      {genreList.map((genre) => {
        return (
          <div
            className={`col btn btn-sm m-1 ${
              genreChoice.indexOf(genre.id.toString()) > -1
                ? "btn-secondary"
                : "btn-outline-secondary"
            }`}
            style={{
              padding: '0.5rem'
            }}
            key={genre.id}
            data-genre-id={genre.id}
            onClick={toggleGenre}
          >
            {genre.name}
          </div>
        );
      })}
    </div>
  );
};

export default Fitler;

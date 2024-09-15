import React, { useState, useEffect } from 'react';
import './Recommendation.css'; // Import your CSS file for styling

const API_KEY = 'e6a8a833176f610ddab69b3aec7b47c7'; // Your TMDb API key
const MOVIE_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Recommendation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});

  useEffect(() => {
    // Fetch genres
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((data) => {
        const genreMap = data.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});
        setGenres(genreMap);
      })
      .catch((error) => console.error('Error fetching genre data:', error));
  }, []);

  useEffect(() => {
    if (searchQuery) {
      fetch(MOVIE_API_URL + searchQuery)
        .then((response) => response.json())
        .then((data) => {
          // Filter out movies with incomplete details
          const filteredMovies = data.results.filter((movie) =>
            movie.poster_path && movie.title && movie.vote_average && movie.genre_ids.length
          );
          setMovies(filteredMovies);
        })
        .catch((error) => console.error('Error fetching movie data:', error));
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.elements.search.value);
  };

  return (
    <div className="recommendation">
      <h1 style={{textAlign:"center",marginBottom:"20px"}}>Movie Recommendations</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          name="search"
          placeholder="Search for movies..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="movie-grid">
        {movies.map((movie) => {
          const movieGenres = movie.genre_ids.map(id => genres[id] || 'Unknown').join(', ');
          return (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-card-image"
              />
              <div className="movie-card-content">
                <h3 className="movie-card-title">{movie.title}</h3>
                <p className="movie-card-rating">Rating: {movie.vote_average}</p>
                <p className="movie-card-genres">{movieGenres}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recommendation;

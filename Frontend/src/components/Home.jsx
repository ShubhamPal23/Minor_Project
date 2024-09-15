import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './Home.css'; 

const API_KEY = 'e6a8a833176f610ddab69b3aec7b47c7'; 
const MOVIE_API_URL = (page) => `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
const TOTAL_PAGES = 6; 

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState({});

  useEffect(() => {
  
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

    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = (page) => {
    fetch(MOVIE_API_URL(page))
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch((error) => console.error('Error fetching movie data:', error));
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="home">
      <h1 style={{textAlign:"center" ,marginBottom:"20px"}}>Top Rated Movies</h1>
      <div className="movie-grid">
        {movies.map((movie) => {
          const movieGenres = movie.genre_ids.map(id => genres[id] || 'Unknown');
          return (
            <MovieCard
              key={movie.id}
              title={movie.title}
              imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              rating={movie.vote_average}
              genres={movieGenres}
            />
          );
        })}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {[...Array(TOTAL_PAGES)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;

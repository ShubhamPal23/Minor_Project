import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './genre.css'; 

const Genre = () => {
  const api_url = "https://api.themoviedb.org/3/genre/movie/list?api_key=e6a8a833176f610ddab69b3aec7b47c7";
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const navigate=useNavigate();

  useEffect(() => {
    fetch(api_url)
      .then((response) => response.json())
      .then((json) => setGenres(json.genres));
  }, []);

  const handleGenreChange = (e, genre) => {
    if (e.target.checked) {
      setSelectedGenres((prevGenres) => [...prevGenres, genre.name]);
    } else {
      setSelectedGenres((prevGenres) => prevGenres.filter((g) => g !== genre.name));
    }
  };

  const handleSubmit = () => {
    if (selectedGenres.length < 2) {
      alert("Please select at least 2 genres.");
      return;
    }
    else
    {
        navigate('/')
    }

    // Submit the selected genres to your backend or perform any other desired action
    console.log("Selected genres:", selectedGenres);
  };

  return (
    <div>
      <h2>Select your favorite genres:</h2>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            <input
              type="checkbox"
              id={genre.id}
              value={genre.name}
              onChange={(e) => handleGenreChange(e, genre)}
            />
            <label htmlFor={genre.id}>{genre.name}</label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Genre;
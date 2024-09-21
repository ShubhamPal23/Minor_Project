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
    <div className='genre'>
      <h2>Select your favorite Genres</h2>

<div className="container text-center">
  <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">

    {genres.map((genre) => (
      <div className="col" key={genre.id}>
        <div className="p-3">
          <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
             <input type="checkbox" className="btn-check" id={genre.id} value={genre.name} onChange={(e) => handleGenreChange(e, genre)} />
             <label className="button" htmlFor={genre.id}>{genre.name}</label>
          </div>
       </div>
      </div>
    ))}
    
  </div>
</div>


<div className="d-grid gap-2 col-6 mx-auto  p-5">
  <button className="btn btn-primary" type="button" onClick={handleSubmit}>Filter</button>
</div>
  
  </div> 
  );
}

export default Genre;

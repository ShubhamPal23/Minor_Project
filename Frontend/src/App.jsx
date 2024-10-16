// import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import "./App.css"
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Recommendation from "./components/Recommendation";
import Genre from "./components/Genre";
import Trending from "./components/Trending";


function App() {
  return (
    <div id="root">
      
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/recommendation" element={<Recommendation/>}></Route>
          <Route path="/genre" element={<Genre/>}></Route>
          <Route path="/trending" element={<Trending/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

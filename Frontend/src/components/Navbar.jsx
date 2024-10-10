import { json, NavLink } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {


  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleLog = () => {
    navigate('/login');
  };

  const handleSign = () => {
    navigate('/register');
  };

  const handlegenre =()=>{
    navigate('/genre')
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>MovieZone</h1>
      </div>
      <button onClick={handlegenre}>Select Your Favourite Genre</button>
      <ul className="nav-links">
        <NavLink className="liinks" to="/">Home</NavLink>
        {/* <Link to="/trending">Trending</Link> */}
        <NavLink className="liinks" to="/recommendation">Recommendation</NavLink>
        <NavLink className="liinks" to="/about">About Us</NavLink>
      </ul>
      <div className="user-auth">
        {user ? (
          <div>
            <span style={{color:"orange"}}>Welcome, {user.name}!</span>
            <button onClick={handleLogout} className="login-btn">Logout</button>
          </div>
        ) : (
          <>
            <button onClick={handleLog} className="login-btn">Login</button>
            <button onClick={handleSign} className="signup-btn">Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;




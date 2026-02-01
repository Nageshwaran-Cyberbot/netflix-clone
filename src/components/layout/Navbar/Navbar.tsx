import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            NETFLIX
          </Link>
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/tv-shows">TV Shows</Link></li>
            <li><Link to="/my-list">My List</Link></li>
          </ul>
        </div>
        
        <div className="navbar-right">
          <Link to="/search" className="navbar-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </Link>
          
          {isAuthenticated ? (
            <div 
              className="navbar-profile"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <img 
                src={user?.avatar || "https://i.pravatar.cc/40"} 
                alt="Profile" 
                className="navbar-avatar"
              />
              {showDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-user">
                    <p className="user-name">{user?.name}</p>
                    <p className="user-email">{user?.email}</p>
                  </div>
                  <button onClick={handleLogout} className="logout-btn">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="navbar-login-btn">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

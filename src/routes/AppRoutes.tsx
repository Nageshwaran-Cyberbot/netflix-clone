import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Home from '../pages/Home/Home';
import Movies from '../pages/Movies/Movies';
import TVShows from '../pages/TVShows/TVShows';
import MyList from '../pages/MyList/MyList';
import Search from '../pages/Search/Search';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: '#fff'
      }}>
        Loading...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv-shows" element={<TVShows />} />
      <Route path="/search" element={<Search />} />
      
      {/* Fully Protected Route - Requires Auth */}
      <Route 
        path="/my-list" 
        element={
          <ProtectedRoute>
            <MyList />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;

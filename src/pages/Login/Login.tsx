import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError(''); // Clear any previous errors
      const success = await login(formData.email, formData.password);
      if (success) {
        // Navigation will happen via useEffect when isAuthenticated becomes true
        console.log('✅ Login successful, redirecting...');
        // Also do immediate navigation as backup
        setTimeout(() => navigate('/', { replace: true }), 100);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/IN-en-20241008-TRIFECTA-perspective_b28b640f-cee0-426b-ac3a-7c000d3b41b7_large.jpg"
          alt="Background"
        />
        <div className="auth-overlay"></div>
      </div>

      <div className="auth-content">
        <div className="auth-header">
          <Link to="/" className="netflix-logo">NETFLIX</Link>
        </div>

        <div className="auth-form-container">
          <h2>Sign In</h2>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email or phone number"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="auth-footer">
              <p>
                New to Netflix?{' '}
                <Link to="/register" className="auth-link">
                  Sign up now
                </Link>
              </p>
            </div>

            <div className="auth-demo">
              <p className="demo-info">
                <strong>Demo Credentials:</strong>
              </p>
              <p className="demo-text">Email: demo@netflix.com</p>
              <p className="demo-text">Password: demo123</p>
              <button
                type="button"
                className="demo-fill-button"
                onClick={() => {
                  setFormData({ email: 'demo@netflix.com', password: 'demo123' });
                  setError('');
                }}
                disabled={loading}
              >
                Use Demo Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

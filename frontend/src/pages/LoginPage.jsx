import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      login();
      navigate('/courses');
    } else {
      setError('Invalid username or password (use admin/password)');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Mini-LMS Login</h2>
        <form onSubmit={handleLogin}>
          {error && <div className="error-text">{error}</div>}
          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-input" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin"
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required 
            />
          </div>
          <button type="submit" className="btn-primary">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

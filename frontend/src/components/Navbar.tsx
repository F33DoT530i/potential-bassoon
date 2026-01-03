import React from 'react';
import { useAuth } from '../utils/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1>📋 Task Manager</h1>
      {user && (
        <div className="navbar-actions">
          <span className="navbar-user">Welcome, {user.name}</span>
          <button className="btn btn-secondary" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

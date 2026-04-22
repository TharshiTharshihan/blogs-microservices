// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  //const navigate = useNavigate();

  // const handleLogout = async () => {
  //   await logout();
  //   navigate('/');
  // };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <Link to="/" style={styles.brandLink}>✍️ BlogApp</Link>
      </div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={{ ...styles.link, ...styles.createBtn }}>Register</Link>
       
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 40px', background: '#1a1a2e', color: '#fff', position: 'sticky', top: 0, zIndex: 100,
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)' },
  brand: {},
  brandLink: { color: '#e94560', fontSize: '1.4rem', fontWeight: 700, textDecoration: 'none' },
  links: { display: 'flex', alignItems: 'center', gap: '20px' },
  link: { color: '#ccc', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' },
  createBtn: { background: '#e94560', color: '#fff', padding: '7px 16px', borderRadius: '20px',
    fontWeight: 600 },
  username: { color: '#e94560', fontSize: '0.9rem', fontWeight: 600 },
  logoutBtn: { background: 'transparent', border: '1px solid #e94560', color: '#e94560',
    padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.9rem' },
};

export default Navbar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Inicio
          </Link>
        </li>
        <li>
          <Link 
            to="/alumnos" 
            className={location.pathname === '/alumnos' ? 'active' : ''}
          >
            Alumnos
          </Link>
        </li>
        <li>
          <Link to="/informacion" className={location.pathname === '/informacion' ? 'active' : ''}>
            Información
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
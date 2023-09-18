import React from 'react';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';



function Menu() {
  return (
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link  className="navbar-brand" to="/">Mi Aplicación</Link >
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">

        {localStorage.getItem('token') && <li className="nav-item">
            <Link  className="nav-link" to="/"  activeClassName="active">Inicio</Link >
          </li>
          }
            {localStorage.getItem('token') && <li className="nav-item">
            <Link  className="nav-link" to="/registroauto"  activeClassName="active">Registrar Autos</Link >
          </li>
          }
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Usuarios
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/registraruser">Registrar Usuario</a>
                {localStorage.getItem('token') && <a className="dropdown-item">
                <a  className="nav-link" href="/verusuario"  activeClassName="active">Ver Usuarios</a >
                </a>
                }
              </div>
            </li>
              
          {!localStorage.getItem('token') && <li className="nav-item">
            <Link  className="nav-link" to="/login"  activeClassName="active">Login</Link >
          </li>
          }
          {localStorage.getItem('token') && <li className="nav-item">
            <Link  className="nav-link" to="/salir"  activeClassName="active">Salir</Link >
          </li>
          }
            

          </ul>
        </div>
      </div>
    </nav>
    );
  }
  
  export default Menu;
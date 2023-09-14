import React from "react";
import { NavLink } from "react-router-dom";



function Menu() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink  className="navbar-brand" to="/">Mi Aplicación</NavLink >
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
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/"  activeClassName="active"> Inicio</NavLink >
            </li>
            <li className="nav-item">
              <NavLink  className="nav-link" to="/registroauto"  activeClassName="active">Registrar Autos</NavLink >
            </li>
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Usuarios
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/registraruser">Registrar Usuario</a>
                <a className="dropdown-item" href="/verusuario">Ver Usuarios</a>
              </div>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Prueba de datos
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/login">Login</a>
                <a className="dropdown-item" href="/alquilerauto">AlquilerAuto</a>
                <a className="dropdown-item" href="/actualizaruser">ActualizarUsuario</a>
              </div>
            </li>

          </ul>
        </div>
      </div>
    </nav>
    );
  }
  
  export default Menu;
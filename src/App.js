import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './Menu';
import Inicio from './Inicio';
import RegistroAuto from './RegistroAuto';
import AlquilerAuto from './AlquilerAuto';
import Login from './Login';
import ActualizarUser from './ActualizarUser';
import VerUsuario from './VerUsuario';
import RegistrarUser from './RegistrarUser';
import Salir from './Salir';
import Title from './Title';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verifica el estado de inicio de sesión aquí, por ejemplo, a través de un token de autenticación
    const token = localStorage.getItem('token'); // Suponiendo que utilizas localStorage para almacenar el token de autenticación

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Title text="Alquiler de Autos Don Miguel" />
        <div>
          <Menu />
          <Routes>
            <Route path="/" element={isLoggedIn ? <Inicio /> : <Login />} />
            {isLoggedIn ? (
              <>
                <Route path="/registroauto" exact element={<RegistroAuto />} />
                <Route path="/alquilerauto/:id" exact element={<AlquilerAuto />} />
                <Route path="/actualizaruser/:id" exact element={<ActualizarUser />} />
                <Route path="/verusuario" exact element={<VerUsuario />} />
              </>
            ) : null}
            <Route path="/registraruser" exact element={<RegistrarUser />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/salir" element={<Salir />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

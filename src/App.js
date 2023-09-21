import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
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
import Title from './Title'; // Importa el componente Title

function App() {
 

  return (
    <Router>
      <div className="app-container">
      <Title text="Alquiler de Autos Don Miguel" /> {/* Utiliza el componente Title */}
      <div>
        <Menu />
        <Routes>
          <Route path="/" exact element={<Inicio />} />
          <Route path="/registroauto" exact element={<RegistroAuto />} />
          <Route path="/alquilerauto/:id" exact element={<AlquilerAuto />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/actualizaruser/:id" exact element={<ActualizarUser />} />
          <Route path="/verusuario" exact element={<VerUsuario />} />
          <Route path="/registraruser" exact element={<RegistrarUser />} />
          <Route path="/salir" element={<Salir />} />
        </Routes>
      </div>
      </div>
    </Router>
  );
}

export default App;

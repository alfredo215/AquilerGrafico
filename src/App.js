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
function App() {
  return (
    //prueba del alquiler no te olvides
    <Router>
      
      <h1>Alquiler de Autos</h1>
    
      <div>
        <Menu />
        <Routes>
        <Route path="/" exact element={<Inicio/>} />
          <Route path="/registroauto" exact element={<RegistroAuto/>}/>
          <Route path="/alquilerauto/:id" exact element={<AlquilerAuto/>}/>
          <Route path="/login" exact element={<Login/> }/>
          <Route path="/actualizaruser/:id" exact element={<ActualizarUser/>}/>
          <Route path="/verusuario" exact element={<VerUsuario/>}/>
          <Route path="/registraruser" exact element={<RegistrarUser/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;

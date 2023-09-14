import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
        <Switch>
          <Route path="/" exact component={Inicio} />
          <Route path="/registroauto" component={RegistroAuto}/>
          <Route path="/alquilerauto" component={AlquilerAuto}/>
          <Route path="/login" component={Login}/>
          <Route path="/actualizaruser" component={ActualizarUser}/>
          <Route path="/verusuario" component={VerUsuario}/>
          <Route path="/registraruser" component={RegistrarUser}/>

        </Switch>
      </div>
    </Router>
  );
}

export default App;

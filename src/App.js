import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Menu from './Menu';
import Inicio from './Inicio';
import RegistroAuto from './RegistroAuto';
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;

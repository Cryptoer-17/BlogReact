import React from 'react';
import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Homepage from './containers/Homepage/Homepage';
import RisultatiRicerca from './containers/RisultatiRicerca/RisultatiRicerca';
import NuovoArticolo from './containers/NuovoArticolo/NuovoArticolo';
import Navigazione from './Components/Navigazione/Navigazione';
import Articolo from './Components/Articolo/Articolo';
function App() {
  return (
    <div className="App">
         <BrowserRouter>
         <Navigazione/>
          <Switch>
            <Route path="/" exact component={Homepage} /> 
            <Route path="/pubblica" exact  component={NuovoArticolo} /> 
            <Route path="/ricerca"  component = {RisultatiRicerca} /> 
            <Route path="/articolo/:id" component ={Articolo} />
           </Switch>
         </BrowserRouter>
    </div>
  );
}

export default App;

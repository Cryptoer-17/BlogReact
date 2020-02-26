import React from 'react';
import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Homepage from './containers/Homepage/Homepage';
import RisultatiRicerca from './containers/RisultatiRicerca/RisultatiRicerca';
import NuovoArticolo from './containers/NuovoArticolo/NuovoArticolo';

function App() {
  return (
    <div className="App">
         <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Homepage} /> 
            <Route path="/ricerca" exact  component={RisultatiRicerca} /> 
            <Route path="/pubblica" exact  component={NuovoArticolo} /> 
           </Switch>
         </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import Homepage from './containers/Homepage/Homepage';
import RisultatiRicerca from './containers/RisultatiRicerca/RisultatiRicerca';
import NuovoArticolo from './containers/NuovoArticolo/NuovoArticolo';
import Navigazione from './Components/Navigazione/Navigazione';
function App() {
  return (
    <div className="App">
         <BrowserRouter>
         <Navigazione/>
          <Switch>
            <Route path="/" exact component={Homepage} /> 
            <Route path="/ricerca" exact  component={RisultatiRicerca} /> 
            <Route path="/pubblica" exact  component={NuovoArticolo} /> 
           </Switch>
           <Redirect to = "/"/>
         </BrowserRouter>
    </div>
  );
}

export default App;

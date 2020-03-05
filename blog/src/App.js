import React, {Component} from 'react';
import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Homepage from './containers/Homepage/Homepage';
import RisultatiRicerca from './containers/RisultatiRicerca/RisultatiRicerca';
import NuovoArticolo from './containers/NuovoArticolo/NuovoArticolo';
import Navigazione from './Components/Navigazione/Navigazione';
import Articolo from './Components/Articolo/Articolo';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';


class App extends Component {

componentDidMount(){
  this.props.onInitArticoli();
}

  render(){
    
  return (
    <div className="App">
         <BrowserRouter>
         <Navigazione/>
          <Switch>
            <Route path="/" exact render={() =>(<Homepage mount={() => this.componentDidMount()}/>)} /> 
            <Route path="/pubblica" exact  component={NuovoArticolo} /> 
            <Route path="/ricerca"  component = {RisultatiRicerca} /> 
            <Route path="/articolo/:id" component ={Articolo} />
           </Switch>
         </BrowserRouter>
    </div>
  );
  }

}

const mapDispatchToProps = dispatch =>{
  return{
     onInitArticoli: () => dispatch(actions.initArticoli())
  }
}

export default connect(null,mapDispatchToProps)(App);

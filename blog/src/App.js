import React, {Component} from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Homepage from './containers/Homepage/Homepage';
import RisultatiRicerca from './containers/RisultatiRicerca/RisultatiRicerca';
import NuovoArticolo from './containers/NuovoArticolo/NuovoArticolo';
import Navigazione from './Components/Navigazione/Navigazione';
import Articolo from './Components/Articolo/Articolo';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import Login from './containers/Login/Login'; 

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
           {/**show=true */}
            <Route path="/" exact render={() =>(<Homepage spinner={this.props.loading} errore={this.props.error} mount={() => this.componentDidMount()}/>)} /> 
            <Route path="/pubblica" exact  component={NuovoArticolo} /> 
            <Route path="/ricerca"  component = {RisultatiRicerca} /> 
            <Route path="/articolo/:id" component ={Articolo} />
           </Switch>
         </BrowserRouter>
    </div>
  );
  }

}

const mapStateToProps = state =>{
  return{
      loading: state.articolo.loading,
      error : state.articolo.error
  };
};


const mapDispatchToProps = dispatch =>{
  return{
     onInitArticoli: () => dispatch(actions.initArticoli())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

import React, {Component} from 'react';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import Homepage from './containers/Homepage/Homepage';
import RisultatiRicerca from './containers/RisultatiRicerca/RisultatiRicerca';
import Navigazione from './Components/Navigazione/Navigazione';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';


const asyncNuovoArticolo = asyncComponent(() =>{
  return import('./containers/NuovoArticolo/NuovoArticolo');
});

const AsyncProfilo = asyncComponent(() =>{
  return import('./containers/Profilo/Profilo');
});

const asyncArticolo = asyncComponent(() =>{
  return import('./Components/Articolo/Articolo');
});

const asyncMainPage = asyncComponent(() =>{
  return import('./Components/MainPage/MainPage');
});


class App extends Component {

componentDidMount(){
  
const userId = localStorage.getItem("userId");
if(userId){
  this.props.onInitArticoli();
  this.props.onGetProfilo(userId);

}
}

  render(){
   let tempProfilo ={
      nome: (this.props.profilo.nome===undefined ? '' : this.props.profilo.nome),
      cognome : (this.props.profilo.cognome===undefined ? '' : this.props.profilo.cognome),
      dataNascita:  this.props.profilo.dataNascita,
      sesso:this.props.profilo.sesso,
      numeroTelefono:(this.props.profilo.numeroTelefono===undefined ? '' : this.props.profilo.numeroTelefono),
      nazionalità: this.props.profilo.nazionalità,
      img:this.props.profilo.img
     }
   
  
    
  return (
    <div className="App">
         <BrowserRouter>
         <Navigazione/>
          <Switch>
           {localStorage.getItem("userId") ?  <Route path="/" exact render={() =>(<Homepage spinner={this.props.loading} errore={this.props.error} mount={() => this.componentDidMount()}/>)} /> :   <Route path="/" exact  component={asyncMainPage} /> }
           {localStorage.getItem("userId") ?    <Route path="/pubblica" exact  component={asyncNuovoArticolo} /> : null }
           {localStorage.getItem("userId") ?    <Route path="/profilo" exact  render={() =>(<AsyncProfilo profilo={tempProfilo}/>)} /> : null }
          {localStorage.getItem("userId") ?  <Route path="/ricerca"  component = {RisultatiRicerca} /> : null }
            {localStorage.getItem("userId") ?  <Route path="/articolo/:id" component ={asyncArticolo} /> : null}
            <Redirect to= "/" />
           </Switch>
         </BrowserRouter>
        
    </div>
  );
  }

}

const mapStateToProps = state =>{

  return{
      loading: state.articolo.loading,
      error : state.articolo.error,
      profilo: state.profilo.profilo
  };
};


const mapDispatchToProps = dispatch =>{
  return{
     onInitArticoli: () => dispatch(actions.initArticoli()),
     onGetProfilo:(userId) => dispatch(actions.getProfili(userId)) 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

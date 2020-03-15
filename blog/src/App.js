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
  this.props.onGetProfili();

}
}

  render(){
    //console.log(this.profili.profili);

    



    const rowLength= this.props.profili.length;
    let key = null;
    let c = 0;
    let tempProfilo = this.props.profili.map((profilo,i) =>{
      if(profilo.profili.userId=== localStorage.getItem("userId")){
        c=c+1;
        key = profilo.key;
        let tempArray={
          nome: (profilo.profili.nome === undefined ? '' : profilo.profili.nome),
          cognome:(profilo.profili.cognome===undefined? '' : profilo.profili.cognome),
          dataNascita: profilo.profili.dataNascita,
          sesso:profilo.profili.sesso,
          numeroTelefono:(profilo.profili.numeroTelefono===undefined ? '' : profilo.profili.numeroTelefono),
          nazionalità:profilo.profili.nazionalità,
          img: profilo.profili.img
        }
          return(<AsyncProfilo  
            profilo={tempArray}
            key={profilo.key}
            />
          );
      }else if(rowLength === i+1 && c===0){
        let tempArray={
          nome:  '',
          cognome: '' ,
          dataNascita: undefined,
          sesso:'',
          numeroTelefono:'' ,
          nazionalità:'',
          img: ''
        }
        return(<AsyncProfilo  profilo={tempArray} key={i}/>);
      }
    })

  /* let tempProfilo ={
      nome: (this.props.profilo.nome===undefined ? '' : this.props.profilo.nome),
      cognome : (this.props.profilo.cognome===undefined ? '' : this.props.profilo.cognome),
      dataNascita:  this.props.profilo.dataNascita,
      sesso:this.props.profilo.sesso,
      numeroTelefono:(this.props.profilo.numeroTelefono===undefined ? '' : this.props.profilo.numeroTelefono),
      nazionalità: this.props.profilo.nazionalità,
      img:this.props.profilo.img
     }*/
  
     /*let tempProfilo={
       nome: '',
       cognome: '',
       dataNascita: undefined,
       sesso:'',
       numeroTelefono:'',
       img:''
     }*/
    
  return (
    <div className="App">
         <BrowserRouter>
         <Navigazione idProfilo={key}/>
          <Switch>
           {localStorage.getItem("userId") ?  <Route path="/" exact render={() =>(<Homepage spinner={this.props.loading} errore={this.props.error} mount={() => this.componentDidMount()}/>)} /> :   <Route path="/" exact  component={asyncMainPage} /> }
           {localStorage.getItem("userId") ?    <Route path="/pubblica" exact  component={asyncNuovoArticolo} /> : null }
           {localStorage.getItem("userId") ?    <Route path={"/profilo" + (key ? "/"+key : "")} exact  render={() =>(tempProfilo /*<AsyncProfilo profilo={tempProfilo}/>*/)} /> : null }
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
      profili: state.profilo.profili
  };
};


const mapDispatchToProps = dispatch =>{
  return{
     onInitArticoli: () => dispatch(actions.initArticoli()),
     onGetProfili:() => dispatch(actions.getProfili()) 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

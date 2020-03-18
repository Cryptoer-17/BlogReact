import React, {Component} from 'react';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import Homepage from './containers/Homepage/Homepage';
import RisultatiRicerca from './containers/RisultatiRicerca/RisultatiRicerca';
import Navigazione from './Components/Navigazione/Navigazione';
import Modifica from './Components/Modifica/Modifica';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import { FaWindows } from 'react-icons/fa';


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
  state={
    idArticleModify:null,
    articolo:null
  }


componentDidMount(){
  
const userId = localStorage.getItem("userId");
if(userId){
  this.props.onInitArticoli();
  this.props.onGetProfilo();
  
}
}


updateArticoloHandler = (articolo,id) =>{
  
  //this.props.onGetArticolo(id);
  this.setState({idArticleModify:id})

const updateArticolo={
  autore:articolo.autore,
  categoria:articolo.categoria,
  data:articolo.data,
  descrizione:articolo.descrizione,
  img:articolo.img,
  minuti:articolo.minuti,
  sottotitolo:articolo.sottotitolo,
  tags:(articolo.tags === undefined ? "" : articolo.tags),
  testo:articolo.testo,
  titolo:articolo.titolo,
  userId:articolo.userId
}

  this.setState({articolo:updateArticolo})

}

  render(){
    


    let tempArrayArticolo;
   
  /*  tempArrayArticolo={
      autore:articolo.autore,
      categoria:articolo.categoria,
      data:articolo.data,
      descrizione:articolo.descrizione,
      minuti:articolo.minuti,
      sottotitoli:articolo.sottotitoli,
      tags:articolo.tags,
      testo:articolo.testo,
      titolo:articolo.titolo,
      userId:articolo.userId
    }*/

    let key; 
      let tempArray;
       if(this.props.profilo.length){
          key=this.props.profilo[0].key;
          tempArray={
          nome: (this.props.profilo[0].profilo.nome === undefined ? '' : this.props.profilo[0].profilo.nome),
          cognome:(this.props.profilo[0].profilo.cognome===undefined? '' : this.props.profilo[0].profilo.cognome),
          dataNascita: this.props.profilo[0].profilo.dataNascita,
          sesso:this.props.profilo[0].profilo.sesso,
          numeroTelefono:(this.props.profilo[0].profilo.numeroTelefono===undefined ? '' : this.props.profilo[0].profilo.numeroTelefono),
          nazionalità:this.props.profilo[0].profilo.nazionalità,
          img: this.props.profilo[0].profilo.img,
          username:this.props.profilo[0].profilo.username,
          descrizione:(this.props.profilo[0].profilo.descrizione === undefined ? '' : this.props.profilo[0].profilo.descrizione)
        }
      }else{
        tempArray={
          nome: '',
          cognome:'',
          dataNascita: '',
          sesso:'',
          numeroTelefono:'',
          nazionalità:'',
          img: undefined,
          username:'',
          descrizione:''
        }
      } 


      

    
  return (
    <div className="App">
         <BrowserRouter>
         <Navigazione idProfilo={key}/>
          <Switch>
           {localStorage.getItem("userId") ?  <Route path="/" exact render={() =>(<Homepage spinner={this.props.loading} errore={this.props.error} clickUpdateArticolo={this.updateArticoloHandler} mount={() => this.componentDidMount()}/>)} /> :   <Route path="/" exact  component={asyncMainPage} /> }
           {localStorage.getItem("userId") ?    <Route path="/pubblica" exact  component={asyncNuovoArticolo} /> : null }
           {localStorage.getItem("userId") ?    <Route path={"/profilo" + (key ? "/:key" : "")} exact  render={() =>(<AsyncProfilo profilo={tempArray} clickUpdateArticolo={this.updateArticoloHandler} key={key}/>)} /> : null }
          {localStorage.getItem("userId") ?  <Route path="/ricerca"  component = {RisultatiRicerca} /> : null }
            {localStorage.getItem("userId") ?  <Route path="/articolo/:id" component ={asyncArticolo} /> : null}
            {localStorage.getItem("userId") ?  <Route path="/modifica/:id"  render = {()=>(<Modifica articolo={this.state.articolo} idArticolo={this.state.idArticleModify}/>)} /> : null }
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
      profilo: state.profilo.profilo,
  };
};


const mapDispatchToProps = dispatch =>{
  return{
     onInitArticoli: () => dispatch(actions.initArticoli()),
     onGetProfilo:() => dispatch(actions.getProfilo()),
   //  onGetArticolo:(id) => dispatch(actions.getArticolo(id)) 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

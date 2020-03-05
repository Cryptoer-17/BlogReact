import React, {Component} from 'react';
import classes from './RisultatiRicerca.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class RisultatiRicerca extends Component{

    state = {
        cerca:"",
        classeCat :null,
        classeTag : null,
    }

componentDidMount(){
this.displayCategoryResultsHandler();
}

/*
searchArticlesHandler = (cerca) =>{
    let risultatiCat = [];
    risultatiCat= this.state.articoli.filter(art => art.categoria === cerca);
    risultatiCat = risultatiCat.map(r => <li key = {r.titolo}> {r.titolo} </li>);
    if (risultatiCat.length === 0){
        risultatiCat = "Nessun risultato.";
    }

    let risultatiTag = [];
    risultatiTag = this.state.articoli.filter(art =>  art.tags.indexOf(cerca)>= 0);
    risultatiTag = risultatiTag.map(r => <li key = {r.titolo}> {r.titolo} </li>);
    if (risultatiTag.length === 0){
        risultatiTag = "Nessun risultato.";
    }
this.setState({risultatiCat:risultatiCat, risultatiTag: risultatiTag});

}
*/


 displayCategoryResultsHandler = () =>{

    this.setState({classeCat: classes.OpzioneSelezionata,classeTag: null});
    this.props.onRicercaArticoli("categoria");
 }

 displayTagResultsHandler = () =>{

     this.setState({classeTag: classes.OpzioneSelezionata,classeCat: null}); 
     this.props.onRicercaArticoli( "tag");
 }
 

    render(){
       
        return(
            <div className = {classes.RisultatiRicerca}>
              <div>  
               {/* <input  autoFocus className = {classes.InputRicerca} type = "text" placeholder = ""  onKeyPress={ event => { if(event.key === 'Enter'){ this.searchArticlesHandler(this.state.cerca)} } } onChange={( event ) => {this.setState( { cerca: event.target.value } );
                 setTimeout(() => {this.searchArticlesHandler(this.state.cerca)}, 500);  } }  /> */}
              </div>

              <div className = {classes.OpzioniRicerca}>
                Filtra per <br/>
                <p className = {this.state.classeCat}  onClick = {this.displayCategoryResultsHandler}>Categoria</p> | <p  className = {this.state.classeTag} onClick = {this.displayTagResultsHandler}>Tag</p>
                <hr  className = {classes.Divisore} />
              </div>

               <div>
                <ul className = {classes.ContainerRisultati}>

                {this.props.risultati ? this.props.risultati : null }
             
                </ul>
               </div>
            </div>

        );
     }
    
}


const mapStateToProps = state =>{
    return{
    risultati: state.articolo.risultatiRicerca
    };
};

const mapDispatchToProps = dispatch => {
    return{
    onRicercaArticoli: (filtro) => dispatch(actions.ricercaArticoli(filtro))
    };
  };



export default connect(mapStateToProps,mapDispatchToProps)(RisultatiRicerca);
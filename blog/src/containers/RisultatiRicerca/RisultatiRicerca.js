import React, {Component} from 'react';
import classes from './RisultatiRicerca.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import AnteprimaArticolo from '../../Components/AnteprimaArticolo/AnteprimaArticolo';
import * as moment from 'moment';
class RisultatiRicerca extends Component{

state = {
    cerca:null,
    classeCat :null,
    classeTag : null,
}
    
componentDidMount(){
    document.getElementById("filtroCategoria").click();
    this.setState({cerca:this.props.cerca})
}
componentDidUpdate(prevState){
    if(prevState.cerca !== this.props.cerca){
        this.setState({cerca:this.props.cerca})
        document.getElementById("filtroCategoria").click();
    }
}


 displayCategoryResultsHandler = () =>{
    this.setState({classeCat: classes.OpzioneSelezionata,classeTag: null});
    this.props.onRicercaArticoli("categoria");
 }

 displayTagResultsHandler = () =>{
     this.setState({classeTag: classes.OpzioneSelezionata,classeCat: null}); 
        this.props.onRicercaArticoli( "tag");
 }
 
render(){
    const {classeCat, classeTag,cerca} = this.state;
    const {risultati} = this.props;
    return(
        <div className = {classes.RisultatiRicerca}>
            <div className = {classes.OpzioniRicerca}>
                Filtra per <br/>
                <p  id = "filtroCategoria" className = {classeCat}  onClick = {this.displayCategoryResultsHandler}>Categoria</p> | <p  id = "filtroTag" className = {classeTag} onClick = {this.displayTagResultsHandler}>Tag</p>
                <hr  className = {classes.Divisore} />
            </div>
            <div>
                <ul className = {classes.ContainerRisultati}>
                {risultati.length > 0  ?       
                    risultati.map( art =>
                    <AnteprimaArticolo 
                    className = {classes.Risultati}
                    id={art.articolo._id} 
                    autore={art.articolo.autore}
                    categoria = {art.articolo.categoria}
                    descrizione = {art.articolo.descrizione}
                    img = {art.articolo.img}
                    like = {art.articolo.like}
                    sottotitolo = {art.articolo.sottotitolo}
                    testo = {art.articolo.testo}
                    titolo = {art.articolo.titolo}
                    data = {moment(art.articolo.data).toDate().toISOString().substr(0,10)}
                    minuti = {art.articolo.minuti}
                    ricerca = {true}
                    key={art.articolo._id}/>          
                    )
                : cerca !== null ? "Nessun risultato." : null }   
                </ul>
            </div>
        </div>
    );
    }
}

const mapStateToProps = state =>{
    return{
    risultati: state.articolo.risultatiRicerca,
    cerca: state.articolo.cerca
    };
};

const mapDispatchToProps = dispatch => {
    return{
    onRicercaArticoli: (filtro) => dispatch(actions.ricercaArticoli(filtro))
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(RisultatiRicerca);
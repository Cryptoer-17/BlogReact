import React, {Component} from 'react';
import classes from './Profilo.module.css';
import {connect } from 'react-redux';
import AnteprimaArticolo from '../../Components/AnteprimaArticolo/AnteprimaArticolo';

class Profilo extends Component{

componentDidMount(){

}

render(){

    let email;
    email = localStorage.getItem('email');

    const personal_article = [...this.props.articoli]

    let articoliVisualizzati;
    articoliVisualizzati = personal_article.map((art) =>{
        if(art.articolo.userId===localStorage.getItem('userId')){
            return (
                <AnteprimaArticolo 
                id={art.key} 
                autore={art.articolo.autore}
                categoria = {art.articolo.categoria}
                descrizione = {art.articolo.descrizione}
                img = {art.articolo.img}
                like = {art.articolo.like}
                sottotitolo = {art.articolo.sottotitolo}
                testo = {art.articolo.testo}
                titolo = {art.articolo.titolo}
                data = {art.articolo.data}
                minuti = {art.articolo.minuti}
                clickHeart = {() => this.clickHeartHandler(art)}
                key={art.key}/>
            );
        } else return null;
      
   })

    return(
        <div className={classes.Profilo}>
            <div>
            <h1>Profilo Persona</h1>
            </div>
            <div className={classes.Email}>
              <p>Email :</p><p> {email}</p> 
            </div>
            {articoliVisualizzati}
        </div>
    );
}

}


const mapStateToProps = state =>{
    console.log(state.articolo.articoli);
    return{
       articoli : state.articolo.articoli
    }
 }
 
 


export default connect(mapStateToProps)(Profilo);
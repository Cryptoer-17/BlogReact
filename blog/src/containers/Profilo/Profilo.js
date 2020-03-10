import React, {Component} from 'react';
import classes from './Profilo.module.css';
import {connect } from 'react-redux';


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
                <div key={art.key}>
                {console.log("entrato")}
            {art.articolo.autore}
            {art.articolo.categoria}
            {art.articolo.minuti}
        </div>
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
import React, {Component} from 'react';
import classes from './Homepage.module.css';
import AnteprimaArticolo from '../../Components/AnteprimaArticolo/AnteprimaArticolo';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import axios from 'axios';
import ScrollTopButton from '../../Components/UI/ScrollUpButton/ScrollTopButton';

class Homepage extends Component{

 
   clickHeartHandler(art){
      const anteprima = {
          autore : art.articolo.autore,
          categoria : art.articolo.categoria,
          descrizione : art.articolo.descrizione,
          img : art.articolo.img,
          like: !art.articolo.like,
          sottotitolo : art.articolo.sottotitolo,
          testo : art.articolo.testo,
          titolo : art.articolo.titolo,
          minuti:art.articolo.minuti,
          data:art.articolo.data
      } 
      const id = art.key;
      
   
      axios.put('https://blog-monika-andrea.firebaseio.com/articoli/'+ id + '.json?auth='+localStorage.getItem("token"),anteprima)
      .then(response => {
         this.props.mount();
      })
      .catch(error => console.log(error));

  }





render(){

   let {spinner, articoli, errore} = this.props;
   

   if(spinner){
     spinner = <Spinner />
   }
   
   let errorMessage = null;
   if(typeof errore === 'undefined'){
   
     errorMessage =  <h3>Errore nel caricamento dati.</h3>;
 
   }
   localStorage.setItem("username","us");
 
  
   let articoliVisualizzati;
    articoliVisualizzati = articoli.map((art) =>{
      return (<AnteprimaArticolo 
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
         key={art.key}/>);
   })
  
  

return(

   <div className={classes.Homepage}>

      <h1 className={classes.Titolo}>Blog</h1>

   
      {spinner}
      {errorMessage ? errorMessage : null}
      <div className={classes.ContainerArticoli} >
         {
         articoli ?
         articoliVisualizzati 
         : null
         }
      </div>

   <ScrollTopButton/>
  
</div>

);


}

}


const mapStateToProps = state =>{
  
   return{
      articoli : state.articolo.articoli
   }
}


export default connect(mapStateToProps)(Homepage);
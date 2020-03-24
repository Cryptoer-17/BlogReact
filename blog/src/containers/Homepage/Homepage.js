import React, {Component} from 'react';
import classes from './Homepage.module.css';
import AnteprimaArticolo from '../../Components/AnteprimaArticolo/AnteprimaArticolo';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import axios from 'axios';
import ScrollTopButton from '../../Components/UI/ScrollUpButton/ScrollTopButton';
import Modal from '../../Components/UI/Modal/Modal';


class Homepage extends Component{
  
clickHeartHandler(art){
   
      let length = art.articolo.like.length;
      console.log(length)
      let c = 0;
      let heartChange = art.articolo.like.map((object)=>{
         if(object.username === localStorage.getItem("username")){
            object.like = !object.like
         }
         else{
            c++;
         }
         return object
      })
      if(c === length){
         heartChange.push({like:true, username:localStorage.getItem("username")})
      }
      
      const anteprima = {
          ...art.articolo,
          like: heartChange
      } 
      const id = art.key;
      axios.put('https://blog-monika-andrea.firebaseio.com/articoli/'+ id + '.json?auth='+localStorage.getItem("token"),anteprima)
      .then(response => {
         this.props.mount();
      })
      .catch(error => console.log(error));
}


render(){

  let {spinner, articoli, errore,mount} = this.props;
   
   let errorMessage = null;
   if(typeof errore === 'undefined'){
     errorMessage =  <h3>Errore nel caricamento dati.</h3>;
   }
 
   let articoliVisualizzati;
   
   if(spinner){
     articoliVisualizzati = <Spinner />
    }else{
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
         disableMore = {true}
         mount = {mount}
         clickHeart = {() => this.clickHeartHandler(art)} 
         key={art.key}/>);
   })
}
   let error;
   if(this.props.error === "Auth token is expired"){
      error = document.getElementById("btnLoginLogout").click()   
   }
   
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
         {error }

   <ScrollTopButton/>
</div>

);
}
}

const mapStateToProps = state =>{
  
   return{
      articoli : state.articolo.articoli,
      error:state.articolo.error
   }
}

export default connect(mapStateToProps)(Homepage);
import React, {Component} from 'react';
import classes from './Homepage.module.css';
import Anteprimaarticolo from '../../Components/AnteprimaArticolo/AnteprimaArticolo';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import axios from 'axios';

class Homepage extends Component{


   clickHeartHandler(){
       
      const anteprima = {
          autore : this.props.autore,
          categoria : this.props.categoria,
          descrizione : this.props.descrizione,
          img : this.props.img,
          like: !this.props.like,
          sottotitolo : this.props.sottotitolo,
          testo : this.props.testo,
          titolo : this.props.titolo
      } 
         
      const id= this.props.id;
      
      axios.put('https://blog-monika-andrea.firebaseio.com/articoli/' + id + '.json',anteprima)
      .then(response => console.log(response))
      .catch(error => console.log(error));

  }





render(){

   let articoli = <Spinner/>; 

   
  
  
  const newarticolo = [ ...this.props.arti];


 const articolo = newarticolo.map((art,index) =>{
   return (<Anteprimaarticolo 
      id={newarticolo[index].key} 
      autore={newarticolo[index].articolo.autore}
      categoria = {newarticolo[index].articolo.categoria}
      descrizione = {newarticolo[index].articolo.descrizione}
      img = {newarticolo[index].articolo.img}
      like = {newarticolo[index].articolo.like}
      sottotitolo = {newarticolo[index].articolo.sottotitolo}
      testo = {newarticolo[index].articolo.testo}
      titolo = {newarticolo[index].articolo.titolo}
      clickHeart = {() => this.clickHeartHandler()}
      key={newarticolo[index].key}/>);
   })
  
  

return(

   <div className={classes.Homepage}>

      <h1 className={classes.Titolo}>Blog</h1>


      <div className={classes.ContainerArticoli} >
      {this.props.arti ? articolo : null}
      </div>

      <button title = "Torna in cima" className = {classes.TornaSuButton}  onClick = {() => document.documentElement.scrollTop = 0}><i className="material-icons">arrow_upward</i> </button>
</div>

);


}

}


const mapStateToProps = state =>{
  
   return{
      arti : state.articolo.articoli
   }
}



export default connect(mapStateToProps)(Homepage);
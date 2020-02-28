import React, {Component} from 'react';
import classes from './Homepage.module.css';
import Anteprimaarticolo from '../../Components/AnteprimaArticolo/AnteprimaArticolo';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Homepage extends Component{

state = {
   cerca : "",
   articoli:[],
   loading : false
}

componentDidMount(){
   this.setState({loading : true})
   axios.get('https://blog-monika-andrea.firebaseio.com/articoli.json')
   .then(response =>{
       //console.log(response.data);
     
     for(let key in response.data){
        this.state.articoli.push(key);
   };
      console.log(this.state.articoli);
      this.setState({loading:false})
   })
   .catch(error => {
     //  this.setState({error:true})
       this.setState({loading:false})
   });
}



render(){

   let variabile ; 

   if(this.state.loading){
      variabile= <Spinner />;
  }
  
  
  const newarticolo = {
      ...this.state.articoli
  };

   const articolo = Object.keys(newarticolo)
   .map((igKey) =>{
      console.log(newarticolo[igKey]);
   return (
   <li key={igKey}>
      <Anteprimaarticolo id={newarticolo[igKey]}/>
   </li>);
   })
  

return(

   <div className={classes.Homepage}>


      <h1 className={classes.Titolo}>Blog</h1>

      <div className={classes.CercaArticoli}>

         <input type="text" placeholder=" Cerca..." onChange={(event) => this.setState({ cerca: event.target.value })} />

         
         <NavLink to="/ricerca" exact className={classes.CercaButton} ><i className="material-icons">search</i></NavLink>

      </div>

      <div className={classes.ContainerArticoli} >
      {/**<Anteprimaarticolo color={false}>
            The continuous evolution of any technology is often accompanied by the greater risks associated with it.
            But the Cyber Security threats that are rising with it are certainly impossible to eliminate completely.
</Anteprimaarticolo>

         <Anteprimaarticolo color={true}>Testo di prova</Anteprimaarticolo> */}   

      {this.state.articoli ? articolo : null}


      </div>


<button title = "Torna in cima" className = {classes.TornaSuButton}  onClick = {() => document.documentElement.scrollTop = 0}><i className="material-icons">arrow_upward</i> </button>
</div>

);


}

}
export default Homepage;
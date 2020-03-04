import React, {Component} from 'react';
import classes from './Homepage.module.css';
import Anteprimaarticolo from '../../Components/AnteprimaArticolo/AnteprimaArticolo';
import axios from '../../utility/axios';
import Spinner from '../../Components/UI/Spinner/Spinner';
import * as actionArticoli from '../../store/actions/index';
import {connect} from 'react-redux';


class Homepage extends Component{
/*
state = {
   articoli:[],
  
}*/

componentDidMount(){
   this.props.onInitArticoli();
}



render(){

   let variabile ; 

   
  
  
  const newarticolo = {
      ...this.props.arti
     
  };

   
 const articolo = Object.keys(newarticolo)
   .map((igKey) =>{
  
   return (<Anteprimaarticolo id={newarticolo[igKey]} key={igKey}/>);
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


const mapDispatchToProps = dispatch =>{
   return{
      onInitArticoli: () => dispatch(actionArticoli.initArticoli())
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Homepage);
import React, {Component} from 'react';
import classes from './Homepage.module.css';
import Anteprimaarticolo from '../../Components/AnteprimaArticolo/AnteprimaArticolo';
import {NavLink} from 'react-router-dom';

class Homepage extends Component{

state = {
   cerca : ""
}


render(){

 
return(

<div className = {classes.Homepage}>


<h1 className = {classes.Titolo}>Blog</h1>

<div className = {classes.CercaArticoli}>

<input type = "text" placeholder = " Cerca..." onChange={( event ) => this.setState( { cerca: event.target.value } )} />


<NavLink to = "/ricerca" exact className = {classes.CercaButton} ><i className="material-icons">search</i></NavLink>
  
</div>

<div className = {classes.ContainerArticoli} >
<Anteprimaarticolo color={false}>
   The continuous evolution of any technology is often accompanied by the greater risks associated with it. 
   But the Cyber Security threats that are rising with it are certainly impossible to eliminate completely.
</Anteprimaarticolo>

<Anteprimaarticolo color={true}>Testo di prova</Anteprimaarticolo>

<Anteprimaarticolo>sadgfdsgdgdfshfdhfdhghgfdg</Anteprimaarticolo>

<Anteprimaarticolo>Hello world</Anteprimaarticolo>

<Anteprimaarticolo>qwertyuiop</Anteprimaarticolo>

</div>


<button className = {classes.TornaSuButton}  onClick = {() => document.documentElement.scrollTop = 0}><i className="material-icons">	arrow_drop_up</i></button>
</div>

);


}

}
export default Homepage;
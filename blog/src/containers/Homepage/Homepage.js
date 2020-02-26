import React, {Component} from 'react';
import classes from './Homepage.module.css';
import Anteprimaarticolo from '../../Components/AnteprimaArticolo/AnteprimaArticolo';

class Homepage extends Component{

state = {
   cerca : ""
}


render(){

 
return(

<div className = {classes.Homepage}>

<div className ={classes.BarraNavigazione}>
<a href ="" className = {classes.Link}><i className="material-icons">home</i> </a>
<a href ="" className = {classes.Link}><i className="material-icons" style = {{verticalAlign:'middle'}}>add_box</i> </a>
<a href ="" className = {classes.LoginLink}> Login </a>
</div>

<h1 className = {classes.Titolo}>Blog</h1>

<div className = {classes.CercaArticoli}>
 <input type = "text" placeholder = " Cerca..." onChange={( event ) => this.setState( { cerca: event.target.value } )} />
   <button className = {classes.CercaButton}><i className="material-icons">search</i></button>
</div>

<div className = {classes.ContainerArticoli} >
<Anteprimaarticolo>
   The continuous evolution of any technology is often accompanied by the greater risks associated with it. 
   But the Cyber Security threats that are rising with it are certainly impossible to eliminate completely.
</Anteprimaarticolo>

<Anteprimaarticolo>Testo di prova</Anteprimaarticolo>

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
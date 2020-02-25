import React, {Component} from 'react';

import classes from './Homepage.module.css';
import Articolo from '../../Components/Articolo/Articolo';



class Homepage extends Component{

render(){


return(

<div className = {classes.Homepage}>

<div className ={classes.BarraNavigazione}>
<a href ="" className = {classes.Link}><i className="material-icons">home</i> </a>
<a href ="" className = {classes.Link}><i className="material-icons" style = {{verticalAlign:'middle'}}>add_box</i> </a>
<a href ="" className = {classes.LoginLink}> Login </a>
</div>

<h1 className = {classes.Titolo}>Blog</h1>

<div className = {classes.FiltroTag}>
   Filtra per <input type = "text" placeholder = "#tag" />
</div>

<Articolo>
   The continuous evolution of any technology is often accompanied by the greater risks associated with it. 
   The same happened on the Internet as well. It has been a boon for every existing technology. 
   Manual working has been greatly reduced with the automation brought about with the internet. 
   But the Cyber Security threats that are rising with it are certainly impossible to eliminate completely.
</Articolo>

<Articolo>Testo di prova</Articolo>

<Articolo>sadgfdsgdgdfshfdhfdhghgfdg</Articolo>

<Articolo>Hello world</Articolo>

<Articolo>qwertyuiop</Articolo>

</div>

);


}

}
export default Homepage;
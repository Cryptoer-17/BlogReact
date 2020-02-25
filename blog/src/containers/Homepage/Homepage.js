import React, {Component} from 'react';
import classes from './Homepage.module.css';
import Articolo from '../../Components/Articolo/Articolo';


class Homepage extends Component{




render(){

return(

<div className = {classes.Homepage}>

<h1>Blog</h1>

<Articolo>
    testo
</Articolo>


<button className = {classes.NuovoArticolo}>Nuovo articolo</button>
</div>

);


}

}
export default Homepage;
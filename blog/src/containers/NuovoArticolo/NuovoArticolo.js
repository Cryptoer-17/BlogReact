import React, {Component} from 'react';
import classes from './NuovoArticolo.module.css';


class NuovoArticolo extends Component{

render(){


return(

<div className = {classes.NuovoArticolo}>

<h2>Nuovo articolo</h2>

<input className = {classes.Input}    type = "text" placeholder = "Titolo" />
<input className = {classes.Input} type = "text" placeholder = "Sottotitolo"/>
<input className = {classes.Input}  type = "text" placeholder = "Autore" />
<textarea  className = {classes.InputTextarea}  placeholder = "..." />
<label className = {classes.Label}><i className="material-icons"  style = {{verticalAlign:'middle'}}>photo_camera</i> Carica una foto </label>
<input className = {classes.Input}  type = "file" accept="image/png,image/gif,image/jpeg, image/jpg" />
<button className = {classes.PubblicaButton}>Pubblica</button>
</div>

);


}

}
export default NuovoArticolo;
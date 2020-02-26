import React, {Component} from 'react';
import classes from './NuovoArticolo.module.css';


class NuovoArticolo extends Component{

state = {
    titolo : "",
    sottotitolo : "",
    autore : "",
    img : null,
    testo : ""
}



render(){


return(

<div className = {classes.NuovoArticolo}>

<h2>Nuovo articolo</h2>

<input className = {classes.Input}  type = "text" placeholder = "Titolo" onChange={( event ) => this.setState( { titolo: event.target.value } )}    />
<input className = {classes.Input} type = "text" placeholder = "Sottotitolo" onChange={( event ) => this.setState( { sottotitolo: event.target.value } )}  />
<input className = {classes.Input}  type = "text" placeholder = "Autore"  onChange={( event ) => this.setState( { autore: event.target.value } )}   />
<textarea  className = {classes.InputTextarea}  placeholder = "..."  onChange={( event ) => this.setState( { testo: event.target.value } )}   />
<label className = {classes.Label}><i className="material-icons"  style = {{verticalAlign:'middle'}}>photo_camera</i> Carica una foto </label>
<input className = {classes.Input}  type = "file" accept="image/png,image/gif,image/jpeg, image/jpg" onChange={( event ) => this.setState( {img: event.target.files} )} />
<button className = {classes.PubblicaButton}>Pubblica</button>
</div>

);


}

}
export default NuovoArticolo;
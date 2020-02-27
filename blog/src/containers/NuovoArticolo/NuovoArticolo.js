import React, {Component} from 'react';
import classes from './NuovoArticolo.module.css';
import Tag from '../../Components/Tag/Tag';

class NuovoArticolo extends Component{

state = {
    titolo : "",
    sottotitolo : "",
    autore : "",
    img : null,
    categoria: "",
    tags : [],
    tagsList:[],
    testo : ""
  
}


addTagHandler = (tag) =>{
    let tagsList = [...this.state.tagsList];
    let tags = this.state.tags;
    if(tags.indexOf(tag) < 0 && tags.length < 15){
    tagsList.push(<Tag key = {tag}>{tag} </Tag>);
    tags = tags.concat(tag);
    this.setState( { tagsList:tagsList, tags:tags } );
    }
}


render(){


return(

<div className = {classes.NuovoArticolo}>

<h2>Nuovo articolo</h2>

<input autoFocus className = {classes.InputTitolo}  type = "text" placeholder = "Titolo" onChange={( event ) => this.setState( { titolo: event.target.value } )}    />
<input className = {classes.Input} type = "text" placeholder = "Sottotitolo" onChange={( event ) => this.setState( { sottotitolo: event.target.value } )}  />
<input className = {classes.Input}  type = "text" placeholder = "Autore"  onChange={( event ) => this.setState( { autore: event.target.value } )}   />
<textarea  className = {classes.InputTextarea}  placeholder = "Scrivi qualcosa..."  onChange={( event ) => this.setState( { testo: event.target.value } )}   />
<input className = {classes.Input}  type = "text" placeholder = "Categoria"  onChange={( event ) => this.setState( { categoria: event.target.value } )}  />

<input className = {classes.Input}  type = "text" placeholder = "#tag"  
   
    onKeyPress={ event => { if(event.key === 'Enter'){ this.addTagHandler(event.target.value)} }}/>
<br/>
<div className = {classes.InputTags}>
{this.state.tagsList}
{this.state.tags.length === 15 ? <p><br/> Hai raggiunto il numero massimo di tag consentiti.</p> : null}
</div>
<br/>
<label className = {classes.Label}><i className="material-icons"  style = {{verticalAlign:'middle'}}>photo_camera</i> Carica una foto </label>
<input className = {classes.Input}  type = "file" accept="image/png,image/gif,image/jpeg, image/jpg" onChange={( event ) => this.setState( {img: event.target.files} )} />
<button className = {classes.PubblicaButton}>Pubblica</button>




</div>

);


}

}
export default NuovoArticolo;
import React, {Component} from 'react';
import classes from './NuovoArticolo.module.css';
import Tag from '../../Components/Tag/Tag';
import axios from 'axios';
import { Link } from 'react-router-dom';



class NuovoArticolo extends Component{

state = {
    titolo : "",
    sottotitolo : "",
    autore : "",
    img : null,
    categoria: "",
    tags : [],
    tagsList:[],
    testo : "",
    tagInput:""
  
}


addTagHandler = (tag) =>{
    let tagsList = [...this.state.tagsList];
    let tags = this.state.tags;
    if(tags.indexOf(tag) < 0 && tags.length < 15 && tag.length>0){
    tagsList.push(<Tag key = {tag} click = {() =>this.deleteTagHandler(tag)}>{tag} </Tag>);
    tags = tags.concat(tag);
    this.setState( { tagsList:tagsList, tags:tags } );
    }
}


deleteTagHandler = (tag) =>{
    let tagsList = [...this.state.tagsList];
    let tags = this.state.tags;
    let i = tags.indexOf(tag);
    tags = tags.splice(i,1);
    tagsList = tagsList.filter(t => t.key !== tag);
    this.setState( { tagsList:tagsList, tags:tags } );
   console.log(this.state)
}



publishArticleHandler = () =>{
    const articolo = {
        titolo: this.state.titolo,
        sottotitolo: this.state.sottotitolo,
        autore: this.state.autore,
        testo: this.state.testo,
        categoria: this.state.categoria,
        tags: this.state.tags,
        immagine: this.state.img
    }

    axios.post('https://blog-monika-andrea.firebaseio.com/articoli.json', articolo )
    .then( res => {
       console.log("ok")
    } )
    .catch( err => {
    
        console.log(err.message)
    } );
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

<input className = {classes.Input}  type = "text" placeholder = "#tag" value = {this.state.tagInput}
    onChange={( event ) => this.setState( {tagInput: event.target.value } )} 
    onKeyPress={ event => { if(event.key === 'Enter'){ this.addTagHandler(event.target.value); this.setState({tagInput:""})}}} />
<br/>
<div className = {classes.InputTags}>
{this.state.tagsList}
{this.state.tags.length === 15 ? <p><br/> Hai raggiunto il numero massimo di tag consentiti.</p> : null}
</div>
<br/>
<hr/>
<label className = {classes.Label}><i className="material-icons"  style = {{verticalAlign:'middle'}}>photo_camera</i> Carica una foto </label>
<input className = {classes.Input}  type = "file" accept="image/png,image/gif,image/jpeg, image/jpg" onChange={( event ) => this.setState( {img: event.target.files} )} />

<Link to = "/"><button className = {classes.PubblicaButton} onClick = {this.publishArticleHandler}>Pubblica</button></Link>




</div>

);


}

}
export default NuovoArticolo;
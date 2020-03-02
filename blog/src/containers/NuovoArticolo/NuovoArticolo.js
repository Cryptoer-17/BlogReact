import React, {Component} from 'react';
import classes from './NuovoArticolo.module.css';
import Tag from '../../Components/Tag/Tag';
import axios from '../../axios';
import Autore from '../../Components/Autore/Autore';

class NuovoArticolo extends Component{

state = {
    titolo : "",
    sottotitolo : "",
    img : null,
    categoria: "",
    tags : [],
    tagsList:[],
    autore: "Moni",
    testo : "",
    tagInput:"",
    anteprimaImg:null,
    esitoCaricamento:""
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
    tags = tags.filter(t => t!== tag);
    tagsList = tagsList.filter(t => t.key !== tag);
    this.setState( { tagsList:tagsList, tags:tags } );
}


 convertFile = (e)=>  { 
        let reader = new FileReader();
        reader.readAsDataURL(e);
        reader.onloadend = () => {
        this.setState({img: reader.result, anteprimaImg: <img src = {reader.result} alt = "" />})
        }

      };
  
  

  publishArticleHandler = () => {
    const articolo = {
        titolo: this.state.titolo,
        sottotitolo: this.state.sottotitolo,
        autore: this.state.autore,
        testo: this.state.testo,
        categoria: this.state.categoria,
        tags: this.state.tags,
        img: this.state.img
    }

    axios.post('/articoli.json', articolo )
    .then( res => { this.setState({esitoCaricamento: "L'articolo è stato pubblicato con successo."});
    setTimeout(() => this.props.history.push("/") , 1000) 
} )
    .catch( err => {
        this.setState({esitoCaricamento: "Errore. Caricamento non eseguito."})
    } );

}



render(){


return(

<div className = {classes.NuovoArticolo}>

<h2>Nuovo articolo</h2>

<input autoFocus className = {classes.InputTitolo}  type = "text" placeholder = "Titolo" onChange={( event ) => this.setState( { titolo: event.target.value } )}  required  />
<input className = {classes.Input} type = "text" placeholder = "Sottotitolo" onChange={( event ) => this.setState( { sottotitolo: event.target.value } )}  />

 <Autore name = {this.state.autore}></Autore>

<textarea  className = {classes.InputTextarea}  placeholder = "Scrivi qualcosa..."  onChange={( event ) => this.setState( { testo: event.target.value } )}  required />
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

<div className = {classes.InputImg}>
    <input  id = "inputFile" type = "file" accept="image/png,image/gif,image/jpeg, image/jpg" onChange={event => this.convertFile(event.target.files[0]) } style = {{display:'none', visibility:'hidden',zIndex:'-200'}}/>

    <button className = {classes.CaricaImgButton} onClick = {() => document.getElementById("inputFile").click() }> <i className="material-icons"  style = {{verticalAlign:'middle'}}>photo_camera</i> Carica una foto</button>
    {this.state.anteprimaImg ? this.state.anteprimaImg : null}
</div>

<hr/>
{this.state.esitoCaricamento}
<br/>

{   this.state.titolo === "" || this.state.testo === "" ?   <button className = {classes.PubblicaButton} onClick = {this.publishArticleHandler} disabled>Pubblica</button>  :         
   <button className = {classes.PubblicaButton} onClick = {this.publishArticleHandler}>Pubblica</button>    }




</div>

);


}

}
export default NuovoArticolo;
import React, {Component} from 'react';
import classes from './NuovoArticolo.module.css';
import Tag from '../../Components/Tag/Tag';
import axios from '../../utility/axios';
import Input from '../../Components/UI/Input/Input';
import checkValidity from '../../utility/validation';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class NuovoArticolo extends Component{

state = {
    form :{
        titolo :{ 
            type: "text",
            value:"",
            validation:{
            required:true},
            touched:false,
            valid:false,
            config:{
            placeholder: "Titolo *",
            autoFocus:true
            }
        },
        sottotitolo : { 
            type: "text",
            value:"",
            touched:false,
            valid:true,
            config:{
            placeholder: "Sottotitolo"}
        },
        testo :{ 
            type: "textarea",
            value:"",
            touched:false,
            valid:false,
            validation:{
                required:true},
                config:{
                placeholder: "Scrivi qualcosa...  *"
                }
        },
        descrizione: { 
            type: "text",
            value:"",
            touched:false,
            valid:true,
            config:{
            placeholder: "Breve descrizione dell'articolo"
             }
        },

        categoria: { 
            type: "text",
            value:"",
            touched:false,
            valid:true,
            config:{
            placeholder: "Categoria"}
        },
    },
    tagInput:"",
    autore: "Moni",
    tags : [],
    tagsList:[],
    img : null,
    anteprimaImg:null,
    esitoCaricamento:"",
    isFormValid : false
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
        titolo: this.state.form.titolo.value,
        sottotitolo: this.state.form.sottotitolo.value,
        autore: this.state.autore,
        testo: this.state.form.testo.value,
        descrizione: this.state.form.descrizione.value,
        categoria: this.state.form.categoria.value,
        tags: this.state.tags,
        img: this.state.img
    }

    this.props.onPostArticolo(articolo);

    /*
    axios.post('/articoli.json', articolo )
    .then( res => { this.setState({esitoCaricamento: "L'articolo è stato pubblicato con successo."});
    setTimeout(() => this.props.history.push("/") , 1000) 
} )
    .catch( err => {
        this.setState({esitoCaricamento: "Errore. Caricamento non eseguito."})
    } );
    */

}



checkValidityOfInput = (event, id) =>{

    let newObj = { ...this.state.form[id], value: event.target.value, valid:checkValidity(event.target.value, this.state.form[id].validation), touched:true };
    let newForm = {...this.state.form,  [id]: {...newObj}}
    let formIsValid = true;
    for (let key in newForm) {
        formIsValid = newForm[key].valid && formIsValid;
    }
        this.setState({isFormValid:formIsValid, form: newForm})
    }




render(){

    const formData = [];
    for(let key in this.state.form){
        formData.push( {id: key , obj: this.state.form[key] });
    };
    
    

return(

<div className = {classes.NuovoArticolo}>

<h2>Nuovo articolo</h2>

 
{formData.map(el =>
        <Input 
        value = {el.obj.value}
        key = {el.id}
        type = {el.obj.type}
        config = {el.obj.config}
        touched = { el.obj.touched}
        valid = { el.obj.valid}
        changed = {(e) => this.checkValidityOfInput(e, el.id)}
        shouldValidate = {el.obj.validation}
        />
        ) }


<input className = {classes.Input}  type = "text" placeholder = "#tag" value = {this.state.tagInput}
    onChange={( event ) => this.setState( {tagInput: event.target.value } )} 
    onKeyPress={ event => { if(event.key === 'Enter'){ this.addTagHandler(event.target.value); this.setState({tagInput:""})}}} />


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

  <button className = {classes.PubblicaButton} onClick = {this.publishArticleHandler}  disabled = { this.state.isFormValid ? false : true }   >Pubblica</button>           
 

</div>

);


}

}


const mapDispatchToProps = dispatch => {
    return{
    onPostArticolo: (articolo) => dispatch(actions.postArticolo(articolo))
    };
  };


export default connect(null,mapDispatchToProps)(NuovoArticolo);


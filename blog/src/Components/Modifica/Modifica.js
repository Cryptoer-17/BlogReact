import React, {Component} from 'react';
import Tag from '../../Components/Tag/Tag';
import checkValidity from '../../utility/validation';
import classes from './Modifica.module.css';
import Input from '../../Components/UI/Input/Input';
import Modal from '../../Components/UI/Modal/Modal';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';



class Modifica extends Component{

    state = {
        form :{
            titolo :{ 
                type: "text",
                value:""+this.props.articolo.titolo+"",
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
                value:""+this.props.articolo.sottotitolo+"",
                touched:false,
                valid:true,
                config:{
                placeholder: "Sottotitolo"}
            },
            testo :{ 
                type: "textarea",
                value:""+this.props.articolo.testo+"",
                touched:false,
                valid:false,
                validation:{
                    required:true},
                    config:{
                    placeholder: "Scrivi qualcosa...  *"
                    }
            },
            categoria: { 
                type: "text",
                value:""+this.props.articolo.categoria+"",
                touched:false,
                valid:false,
                validation:{
                    required:true},
                config:{
                placeholder: "Categoria *"}
            },
            descrizione: { 
                type: "text",
                value:""+this.props.articolo.descrizione+"",
                touched:false,
                valid:true,
                config:{
                placeholder: "Breve descrizione dell'articolo"
                 }
            },
        },
        tagInput:""+this.props.articolo.tags+"",
        tags : [],
        tagsList:[],
        img : null,
        anteprimaImg:(this.props.articolo.img === undefined ? null : <img src = {this.props.articolo.img} alt = "" />),
        isFormValid : false,
        show:false
    }

    countWordsHandler = (testo) =>{
        let minuti = 0;
        let parole = testo.trim().split(' ').length;
          for(let i = 0; i < parole; i++){
              if(i%100 === 0 && i>1)
              minuti++;
          }
      return minuti;
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
  
  

      modifyArticleHandler = async () => {


    const articolo = {
        titolo: this.state.form.titolo.value.trim(),
        sottotitolo: this.state.form.sottotitolo.value.trim(),
        autore: localStorage.getItem("username"),
        testo: this.state.form.testo.value,
        descrizione: this.state.form.descrizione.value.trim(),
        categoria: this.state.form.categoria.value.trim(),
        tags: this.state.tags,
        img: this.state.img,
        data: new Date().toLocaleDateString(),
        minuti: this.countWordsHandler(this.state.form.testo.value),
        userId: localStorage.getItem("userId")
    }
    await this.props.onUpdateArticolo(articolo,this.props.idArticolo);/*
    
    await setTimeout(() => this.props.onInitArticoli(), 1000 ) ;  
    this.showModal();
    setTimeout(() => this.props.history.push("/") , 3000)*/
    
    

}


 showModal = () =>{
    this.setState( {show:true} );
}

 hideModal = () =>{
    this.setState( {show:false} );
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
        console.log(this.props.articolo.descrizione);
        const {form,tagInput,tags,tagsList,anteprimaImg,show} = this.state;
        const {loading, esito} = this.props;

        const formData = [];
        for(let key in  form){
            formData.push( {id: key , obj:  form[key] });
        };
        return (
            <div className={classes.ModificaArticolo}>
                <h2>Modifica articolo</h2>

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
        
            <input className = {classes.Input}  type = "text" placeholder = "#tag" value = { tagInput}
                onChange={( event ) => this.setState( {tagInput: event.target.value } )} 
                onKeyPress={ event => { if(event.key === 'Enter'){ this.addTagHandler(event.target.value); this.setState({tagInput:""})}}} />
            <div className = {classes.InputTags}>
                { tagsList}
                { tags.length === 15 ? <p><br/> Hai raggiunto il numero massimo di tag consentiti.</p> : null}
            </div>
            <br/>
            <hr/>
            <div className = {classes.InputImg}>
                <input  id = "inputFile" type = "file" accept="image/png,image/gif,image/jpeg, image/jpg" onChange={event => this.convertFile(event.target.files[0]) } style = {{display:'none', visibility:'hidden',zIndex:'-200'}}/>
                <button className = {classes.CaricaImgButton} onClick = {() => document.getElementById("inputFile").click() }> <i className="material-icons"  style = {{verticalAlign:'middle'}}>photo_camera</i> Carica una foto</button>
                { anteprimaImg ?  anteprimaImg : null}
            </div>
            <hr/>
            <br/>

            <button className = {classes.PubblicaButton} onClick = { this.modifyArticleHandler}> Modifica </button>           

            <Modal  show = {show}  modalClosed = {  this.hideModal } >
            {!loading ? 
            esito
            :  <Spinner/>}
            </Modal>


            </div>
        );
    }
}


const mapStateToProps = state =>{
    return{
   loading: state.articolo.loading,
   esito: state.articolo.esitoCaricamento,
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onUpdateArticolo: (articolo,id) => dispatch(actions.updateArticolo(articolo,id)),
   
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(Modifica);
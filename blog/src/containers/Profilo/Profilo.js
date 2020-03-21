import React, {Component} from 'react';
import classes from './Profilo.module.css';
import {connect } from 'react-redux';
import AnteprimaArticolo from '../../Components/AnteprimaArticolo/AnteprimaArticolo';
import { MdEmail } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';
import * as actions from '../../store/actions/index';
import Input from '../../Components/UI/Input/Input';
import Spinner from '../../Components/UI/Spinner/Spinner';
import checkValidity from '../../utility/validation';
import updateObject from '../../utility/updateObject';
import Modal from '../../Components/UI/Modal/Modal';
import axios from 'axios';


class Profilo extends Component{


    state={
        showDropdown:false,
        idArticoloCambiamenti:null,
        anteprimaImg:<img className={classes.InputImg} src = {this.props.profilo.img} alt = "" />,
        presentazione:(this.props.profilo.descrizione ? false:null),//false
        modificaDati:null,
        img:null,
        descrizione:''+this.props.profilo.descrizione+'',
        formIsValid: (this.props.profilo.dataNascita === undefined ? false : true),
        show:false,
        profileForm:{
                nome:{
                    elementType:'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'Tuo nome'
                    },
                    value:''+this.props.profilo.nome+'',
                    valid: true,
                    touched: false
                },
                cognome:{
                    elementType:'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'Tuo cognome'
                    },
                    value: ''+this.props.profilo.cognome+'',
                    valid: true,
                    touched: false
                },
                dataNascita: {
                    elementType:'input',
                    elementConfig:{
                        type: 'date'
                    },
                    validation:{
                        isDate:true
                    },
                    value: ''+this.props.profilo.dataNascita+'',
                    valid:true,
                    touched: false
                },
                sesso: {
                    elementType:'radio',
                    elementConfig:{
                        type: 'radio',
                        options:[
                            {value:'f', displayValue:'F'},
                            {value:'m', displayValue:'M'}
                        ]
                    },
                    value: ''+this.props.profilo.sesso+'',
                    valid: true,
                    touched: false

                },
                numeroTelefono:{
                    elementType:'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'Tuo numero  telefono'
                    },
                    value: ''+this.props.profilo.numeroTelefono+'',
                    validation:{
                        minLength:10,
                        maxLength:10
                    },
                    valid: true,
                    touched: false
                },
                nazionalita:{
                    elementType:'select',
                    elementConfig:{
                       options: [
                           {value:'italia', displayValue:'Italia'},
                           {value:'irlanda', displayValue:'Irlanda'},
                           {value:'svezia', displayValue:'Svezia'},
                           {value:'finlandia', displayValue:'Finlandia'},
                           {value:'grecia', displayValue:'Grecia'},
                           {value: 'spagna', displayValue:'Spagna'},
                           {value: 'inghilterra', displayValue:'Inghilterra'}
                        ]
                    },
                    value: ''+this.props.profilo.nazionalità+'',
                    valid: true

                },
                username:{
                    elementType:'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'username'
                    },
                    value: ''+this.props.profilo.username+'',
                    valid: true,
                    touched: false
                },

            }
    }
    



    clickMenuHandler = (props)=>{
    console.log(props);
    this.setState({showDropdown:!this.state.showDropdown})
    this.setState({idArticoloCambiamenti : props})
    }


handlerClickPresentazione(){
    this.setState({presentazione : false})
}

hideModal = () =>{
    this.setState({show:false})
}

showModal = () =>{
    this.setState({show:true})
}

orderHandler= ()=>{
    this.showModal();
    const formData = {};




    for(let formElementIdentifier in this.state.profileForm){
        formData[formElementIdentifier] = this.state.profileForm[formElementIdentifier].value;
    }
   
    const profile={
        nome: formData.nome,
        cognome:formData.cognome,
        dataNascita:formData.dataNascita.trim(),
        sesso: formData.sesso.trim(),
        numeroTelefono:formData.numeroTelefono.trim(),
        nazionalità:(formData.nazionalita.trim() === '' ? 'italia' : formData.nazionalita.trim()),
        img:this.state.img,
        username:formData.username.trim(),
        userId:localStorage.getItem('userId').trim(),
        descrizione:this.state.descrizione
    }
    console.log(profile.nazionalità);

if(this.props.profiloReducer.length){
      this.props.onUpdateData(profile,this.props.profiloReducer[0].key);
}
else {
    this.props.onSendData(profile);
}
   
setTimeout(() =>{
if(this.props.esito === "I dati sono stati inviati/modificati con successo."){
    window.location.reload();
}
},1000)
  
}

handlerModificaDati(){
    this.setState({modificaDati: !this.state.modificaDati})

}

descrizioneChangeHandler = (event) =>{
    this.setState({descrizione: event.target.value})
}

inputChangedHandler = (event, inputIdentifier)=>{


const updatedprofileForm = {
    ...this.state.profileForm
}

  const updatedFormElement= {
    ...updatedprofileForm[inputIdentifier]
}


updatedFormElement.value = event.target.value;

        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedprofileForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedprofileForm) {
            formIsValid = updatedprofileForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({profileForm: updatedprofileForm, formIsValid: formIsValid});

}



convertFile = (e)=>  { 
    let reader = new FileReader();
    if(e !== undefined){
    reader.readAsDataURL(e);
    reader.onloadend = () => {
  
    this.setState({img: reader.result, anteprimaImg: <img className={classes.InputImg} src = {reader.result} alt = "" />})
    }
    }
    else {
        this.setState({img: null, anteprimaImg: null})
        document.getElementById("inputFile").value = null;
    }
  };



  checkValidityOfInput = (event, id) =>{
    let newObj = updateObject(this.state.profileForm[id], {value: event.target.value, valid:checkValidity(event.target.value, this.state.profileForm[id].validation), touched:true });
    let newForm= updateObject(this.state.profileForm, {[id]: {...newObj}})
    let formIsValid = true;
    for (let key in newForm) {
        formIsValid = newForm[key].valid && formIsValid;
    }
        this.setState({isFormValid:formIsValid, profileForm: newForm})
    }

  


  clickHeartHandler(art){
    const anteprima = {
        autore : art.articolo.autore,
        categoria : art.articolo.categoria,
        data:art.articolo.data,
        descrizione : art.articolo.descrizione,
        img : art.articolo.img,
        like: !art.articolo.like,
        minuti:art.articolo.minuti,
        sottotitolo : art.articolo.sottotitolo,
        tags:art.articolo.tags,
        testo : art.articolo.testo,
        titolo : art.articolo.titolo,
        userId:art.articolo.userId
    } 
    const id = art.key;
    axios.put('https://blog-monika-andrea.firebaseio.com/articoli/'+ id + '.json?auth='+localStorage.getItem("token"),anteprima)
    .then(response => {
       this.props.mount();
    })
    .catch(error => console.log(error));
}

render(){
    console.log(this.props);
    let {anteprimaImg,presentazione,modificaDati,showDropdown} = this.state;
    let {loading,profilo} = this.props;

    
    let email;
    email = localStorage.getItem('email');


    const personal_article = [...this.props.articoli]

    let presentazioneVisualizzata ;
    let btnInviaInfo=null;
    {presentazione===null? 
        presentazioneVisualizzata= <button className={classes.BtnPresentazione} onClick={()=>this.handlerClickPresentazione()}><i>Aggiungi una breve presentazione</i></button> 
        : presentazione===false && ((presentazioneVisualizzata = <div style={{marginTop:'-27px'}}><blockquote></blockquote><Input type="text" config={{placeholder:'breve presentazione di te'}} changed={this.descrizioneChangeHandler} value={this.state.descrizione} /></div>) && (btnInviaInfo = <button onClick={this.orderHandler} className={classes.ButtonSend}  ><IoIosSend style={{verticalAlign: 'middle',marginRight: '4px'}}/>Invia breve presentazione</button>))
    } 




    const formElemetsArray = [];
    for(let key in this.state.profileForm){
        formElemetsArray.push({
            id: key,
             config: this.state.profileForm[key],

        })
    }

    let form = (
        <form>
            {formElemetsArray.map(formElement =>(
                    formElement.id !== 'username' ?  <Input 
                    key={formElement.id}
                    type={formElement.config.elementType} 
                    config={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event,formElement.id)}
                    touched = { formElement.config.touched}
                   shouldValidate={formElement.config.validation}
                   valid = {formElement.config.valid}
                   /> :<div key={formElement.id}>
                   <h3>MODIFICA IL TUO USERNAME</h3>    
                   <Input 
                   key={formElement.id}
                   type={formElement.config.elementType} 
                   config={formElement.config.elementConfig}
                   value={formElement.config.value}
                   changed={(event) => this.inputChangedHandler(event,formElement.id)}
                   touched = { formElement.config.touched}
                  shouldValidate={formElement.config.validation}
                  valid = {formElement.config.valid} /></div>
            )
            
            
            )}
        </form>
    );



    let pageModificaDati =  (<div className={classes.ModificaDati}>
    <h3>MODIFICA I TUOI DATI</h3>
        {form}
        <h3>MODIFICA LA TUA FOTO PROFILO</h3>
        <div className={classes.DivFoto} > 
        <button className = {classes.CaricaImgButton}  onClick = {() => document.getElementById("inputFile").click() }> <i className="material-icons"  style = {{verticalAlign:'middle'}}>photo_camera</i> Carica foto profilo</button>
        
        { anteprimaImg ?  anteprimaImg : null}</div>
        <input  id = "inputFile" type = "file" accept="image/png,image/gif,image/jpeg, image/jpg" onChange={ event =>this.convertFile(event.target.files[0]) } style={{width:'0px'}}/* style = {{display:'none', visibility:'hidden',zIndex:'-200'}}*//>
        <button  className={classes.ButtonSend}  onClick={this.orderHandler} disabled={!this.state.formIsValid} style={{position:'absolute', right:'0px', bottom:'0px'}}><IoIosSend style={{verticalAlign: 'middle',marginRight: '4px'}}/>Invia dati</button>
    </div>);




    let articoliVisualizzati;
    articoliVisualizzati = personal_article.map((art) =>{
        if(art.articolo.userId===localStorage.getItem('userId')){
            return (
                <AnteprimaArticolo 
                id={art.key} 
                autore={art.articolo.autore}
                categoria = {art.articolo.categoria}
                descrizione = {art.articolo.descrizione}
                img = {art.articolo.img}
                like = {art.articolo.like}
                sottotitolo = {art.articolo.sottotitolo}
                testo = {art.articolo.testo}
                titolo = {art.articolo.titolo}
                data = {art.articolo.data}
                minuti = {art.articolo.minuti}
                disableMore={false}
                showDropdown={this.state.idArticoloCambiamenti === art.key ? showDropdown :false}
                clickMenuHandler={this.clickMenuHandler}
                UpdateArticolo = {this.props.clickUpdateArticolo}
                clickHeart = {() => this.clickHeartHandler(art)}
                key={art.key}/>
            );
        } else return null;
      
   })

   if(loading){
       pageModificaDati= <Spinner/>
   }

   let modal=null;
   if(loading===false){
       modal=(<Modal show={this.state.show} modalClosed={this.hideModal}>
           {this.props.esito}
       </Modal>);
   }

   
   
    return(
        <div className={classes.Profilo} onClick={showDropdown?this.clickMenuHandler : null}>
            
             {!loading ? modal : null}
            <div>
            <h1>Profilo Persona</h1>
            </div>
            <div className={classes.Informazioni} style={presentazione===null ? null : {height:'185px'}}>
                <h3>INFORMAZIONI</h3>
                BREVE PRESENTAZIONE: {presentazioneVisualizzata}
                {btnInviaInfo}
            </div>
           
            <div className={classes.DatiPersonali}>  
            
                <h3>DATI PERSONALI</h3> 
                <div style={{marginBottom:'10px',fontSize: '18px',lineHeight:'35px'}}>
                <hr/>
                Email : {email}<br/>
                Username:{this.props.profilo.username !== "" ? this.props.profilo.username :  <b>non ancora inserito</b>}<br/>
                <hr/>
                Nome : {this.props.profilo.nome !== "" ? this.props.profilo.nome :  <b>non ancora inserito</b>}<br/>
                Cognome: {this.props.profilo.cognome !== "" ? this.props.profilo.cognome :  <b>non ancora inserito</b>}<br/>
                Data di nascita: {this.props.profilo.dataNascita !== "" ? this.props.profilo.dataNascita :  <b>non ancora inserita</b>}<br/>
                Sesso: {this.props.profilo.sesso !== "" ? this.props.profilo.sesso :  <b>non ancora inserito</b>}<br/>
                Numero di telefono: {this.props.profilo.numeroTelefono !== "" ? this.props.profilo.numeroTelefono :  <b>non ancora inserito</b>}<br/>
                Nazionalità: {this.props.profilo.nazionalità !== "" ? this.props.profilo.nazionalità :  <b>non ancora inserita</b>}<br/>
                <hr/>
                <div style={this.props.profilo.img ? {height: '150px'} : null}>
                Foto profilo: {this.props.profilo.img !== undefined ?<img style={{width:'15%', marginBottom: '-60px', borderStyle:'outset'}} src = {this.props.profilo.img} alt = ""/> :  <b>Non ancora inserita</b>}
                </div>
                </div>
                <div>
                Altri dati coming soon
                <button className={classes.ButtonSend} style={{marginTop:'-6px'}} onClick={() =>this.handlerModificaDati()}><MdEmail style={{verticalAlign: 'middle'}}/> Modifica Dati</button>
                </div>  
                    
                   
            </div>
            {(modificaDati) ? pageModificaDati : null}           
          
            

            {articoliVisualizzati}
        </div>
    );
}

}


const mapStateToProps = state =>{
    return{
       articoli : state.articolo.articoli,
       loading: state.profilo.loading,
       esito: state.profilo.esitoCaricamento,
       profiloReducer:state.profilo.profilo
    }
 }
 
 
 const mapDispatchToProps = dispatch => {
    return{
    // onGoogleAuth: () => dispatch(actions.googleAuth()),
    // onLogin : (email,password,isSignup,errore) => dispatch(actions.login(email,password,isSignup,errore)),
    // onSetLoginRedirectPath: () => dispatch(actions.setLoginRedirectPath('/'))
        onSendData: (data) => dispatch(actions.sendData(data)),
       onUpdateData:(data,idProfilo) =>dispatch(actions.updateData(data,idProfilo))
    };
  };


export default connect(mapStateToProps,mapDispatchToProps)(Profilo);
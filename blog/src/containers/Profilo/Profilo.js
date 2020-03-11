import React, {Component} from 'react';
import classes from './Profilo.module.css';
import {connect } from 'react-redux';
import AnteprimaArticolo from '../../Components/AnteprimaArticolo/AnteprimaArticolo';
import { MdEmail } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';
import * as actions from '../../store/actions/index';

class Profilo extends Component{
    state={
        anteprimaImg:null,
        presentazione:null,
        modificaDati:null,
        img:null
    }

componentDidMount(){

}

HandlerChange(event){
    console.log(event.target.value);
    this.setState({nome: event.target.value})
}

handlerClickPresentazione(){
    this.setState({presentazione : false})
}

sendHandlerClick(nome,cognome,data,sesso,telefono,nazionalita){
    console.log(nome);
    console.log(cognome);
    console.log(data);
    console.log(sesso);
    console.log(telefono);
    console.log(nazionalita);
}

handlerModificaDati(){
    this.setState({modificaDati: !this.state.modificaDati})

}


convertFile = (e)=>  { 
    let reader = new FileReader();
    reader.readAsDataURL(e);
    reader.onloadend = () => {
  
    this.setState({img: reader.result, anteprimaImg: <img className={classes.InputImg} src = {reader.result} alt = "" />})
    }
  };


render(){

    let {anteprimaImg,presentazione,modificaDati} = this.state;
    let email;
    email = localStorage.getItem('email');

    const personal_article = [...this.props.articoli]

    let presentazioneVisualizzata ;
    let btnInviaInfo=null;
    {presentazione===null? 
        presentazioneVisualizzata= <button className={classes.BtnPresentazione} onClick={()=>this.handlerClickPresentazione()}><i>Aggiungi una breve presentazione</i></button> 
        : presentazione===false && ((presentazioneVisualizzata = <input type="text"></input>) && (btnInviaInfo = <button className={classes.ButtonEmail} >Invia breve presentazione</button>))
    } 

    let nome;
    let pageModificaDati =  (<div className={classes.ModificaDati}>
    <h3>MODIFICA I TUOI DATI</h3>
   
        <div className={classes.DivForm}>Nome:<input type="text" id="nome" className={classes.InputForm} placeholder="nome" ></input></div>
        <div className={classes.DivForm}>Cognome:<input type="text" id="cognome" className={classes.InputForm} placeholder="cognome" ></input></div>
        <div className={classes.DivForm}>Data Nascita:<input type="date" id="date" className={classes.InputForm} style={{marginTop: '-3px'}} placeholder="data nascita" ></input></div>
        <div className={classes.DivForm}>Sesso: <label>M</label><input type="radio" id="radio" name="male" value="M" />
                                            <label>F</label><input type="radio" name="male" value="F"/></div>
        <div className={classes.DivForm}>Numero Telefono: <input type="text" id="telefono" className={classes.InputForm} placeholder="numero di telefono"></input></div>
        <div className={classes.DivForm}>Nazionalità:<select id="nazionalita" className={classes.InputForm}>
                <option value="Italia">Italia</option>
                <option value="Grecia" selected="selected">Grecia</option>
                <option value="Spagna">Spagna</option>
                <option value="Inghilterra">Inghilterra</option>
            </select></div>
        <div className={classes.DivForm} > <input  id = "inputFile" type = "file" accept="image/png,image/gif,image/jpeg, image/jpg" onChange={ event =>this.convertFile(event.target.files[0]) } style = {{display:'none', visibility:'hidden',zIndex:'-200'}}/>

        <button className = {classes.CaricaImgButton}  onClick = {() => document.getElementById("inputFile").click() }> <i className="material-icons"  style = {{verticalAlign:'middle'}}>photo_camera</i> Carica foto profilo</button>
        
        { anteprimaImg ?  anteprimaImg : null}</div>
        
        <button 
        className={classes.ButtonSend} 
        onClick={() => this.sendHandlerClick(document.getElementById("nome").value,
                                             document.getElementById("cognome").value,
                                            document.getElementById("date").value,
                                            document.getElementById("radio").value,
                                            document.getElementById("telefono").value,
                                            document.getElementById("nazionalita").value,
                                            )} 
        style={{marginTop: '59px'}}><IoIosSend style={{verticalAlign: 'middle',marginRight: '4px'}}/>Invia dati</button>
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
                clickHeart = {() => this.clickHeartHandler(art)}
                key={art.key}/>
            );
        } else return null;
      
   })

    return(
        <div className={classes.Profilo}>
            <div>
            <h1>Profilo Persona</h1>
            </div>
            <div className={classes.Informazioni}>
                <h3>INFORMAZIONI</h3>
                {presentazioneVisualizzata}
                {btnInviaInfo}
            </div>
           
            <div className={classes.DatiPersonali}>  
                <h3>DATI PERSONALI</h3> 
                <div style={{marginBottom:'10px'}}>
                Email : {email}
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
       articoli : state.articolo.articoli
    }
 }
 
 
 const mapDispatchToProps = dispatch => {
    return{
    // onGoogleAuth: () => dispatch(actions.googleAuth()),
    // onLogin : (email,password,isSignup,errore) => dispatch(actions.login(email,password,isSignup,errore)),
    // onSetLoginRedirectPath: () => dispatch(actions.setLoginRedirectPath('/'))
        onSendData: () => dispatch(actions.sendData())
    };
  };


export default connect(mapStateToProps)(Profilo);
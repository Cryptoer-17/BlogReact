import React, {Component} from 'react';
import classes from './Profilo.module.css';
import {connect } from 'react-redux';
import AnteprimaArticolo from '../../Components/AnteprimaArticolo/AnteprimaArticolo';
import { MdEmail } from 'react-icons/md';
import axios from 'axios';
import { auth, provider } from '../../utility/firebase';
import firebase from 'firebase';

class Profilo extends Component{
    state={
        nome:"",
        anteprimaImg:null,
        presentazione:null,
        modificaDati:null
    }

componentDidMount(){

}

HandlerChange(event){
    console.log(event.target.value);
    this.setState({nome: event.target.value})
}

handlerClickPresentazione(){
    console.log("entrato");
    this.setState({presentazione : false})
}

handlerModificaDati(){

   console.log("modifica dati");
    this.setState({modificaDati: !this.state.modificaDati})

}


convertFile = (e)=>  { 
    console.log("entrato");
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


    let pageModificaDati =  (<div className={classes.ModificaDati}>
    <h3>MODIFICA I TUOI DATI</h3>
   
        <p>Nome:<input type="text"  className={classes.Input} placeholder="nome" onChange={(event) => this.HandlerChange(event)} value={this.state.nome}></input>
        Cognome:<input type="text" placeholder="cognome" className={classes.Input}></input>
        Data Nascita<input type="date" placeholder="data nascita" className={classes.Input}></input></p>
        <p>
         Sesso: <label>M</label><input type="radio" name="male" value="M"/>
                <label>F</label><input type="radio" name="male" value="F"/>
        </p>
        <div className = {classes.InputImg}>
        <input  id = "inputFile" type = "file" accept="image/png,image/gif,image/jpeg, image/jpg" onChange={ event =>this.convertFile(event.target.files[0]) } style = {{display:'none', visibility:'hidden',zIndex:'-200'}}/>

        <button className = {classes.CaricaImgButton} onClick = {() => document.getElementById("inputFile").click() }> <i className="material-icons"  style = {{verticalAlign:'middle'}}>photo_camera</i> Carica foto profilo</button>
       
        { anteprimaImg ?  anteprimaImg : null}
        </div>

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
                <button className={classes.ButtonEmail} onClick={() =>this.handlerModificaDati()}><MdEmail style={{verticalAlign: 'middle'}}/> Modifica Dati</button>
                </div>  
                    
                   
            </div>
            {(modificaDati) ? pageModificaDati : null}           

            {articoliVisualizzati}
        </div>
    );
}

}


const mapStateToProps = state =>{
    console.log(state.articolo.articoli);
    return{
       articoli : state.articolo.articoli
    }
 }
 
 


export default connect(mapStateToProps)(Profilo);
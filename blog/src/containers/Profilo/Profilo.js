import React, { Component } from 'react';
import classes from './Profilo.module.css';
import { connect } from 'react-redux';
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


class Profilo extends Component {
    state = {
        showDropdown: false,
        idArticoloCambiamenti: null,
        anteprimaImg: <img className={classes.InputImg} src={this.props.profilo.img} alt="" />,
        presentazione: (this.props.profilo.descrizione ? false : null),//false
        modificaDati: null,
        img: null,
        idProfilo:''+this.props.profilo._id+'',
        descrizione: '' + this.props.profilo.descrizione + '',
        formIsValid: (this.props.profilo.dataNascita === undefined ? false : true),
        show: false,
        passwordIsValid:false,
        emailIsValid:true,
        messageModalPassord:null,
        modalPassword: false,
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'email'
            },
            value: '' + localStorage.getItem("email") + '',
            validation: {
                isEmail: true
            },
            valid: true,
            touched: false
        },
        password:{
            oldpassword:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Vecchia password'
                },
                validation: {
                    minLength: 6,
                    required:true
                },
                value: '',
                valid: false,
                touched: false
            },
            newpassword1:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Nuova password'
                },
                validation: {
                    minLength: 6,
                    required:true
                },
                value: '',
                valid: false,
                touched: false
            },
            newpassword2:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Nuova password'
                },
                validation: {
                    minLength: 6,
                    required:true
                },
                value: '',
                valid: false,
                touched: false
            },
        },
        profileForm: {
            nome: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Tuo nome'
                },
                value: '' + this.props.profilo.nome + '',
                valid: true,
                touched: false
            },
            cognome: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Tuo cognome'
                },
                value: '' + this.props.profilo.cognome + '',
                valid: true,
                touched: false
            },
            dataNascita: {
                elementType: 'input',
                elementConfig: {
                    type: 'date'
                },
                validation: {
                    isDate: true
                },
                value: '' + this.props.profilo.dataNascita + '',
                valid: true,
                touched: false
            },
            sesso: {
                elementType: 'radio',
                elementConfig: {
                    type: 'radio',
                    options: [
                        { value: 'f', displayValue: 'F' },
                        { value: 'm', displayValue: 'M' }
                    ]
                },
                value: '' + this.props.profilo.sesso + '',
                valid: true,
                touched: false

            },
            numeroTelefono: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Tuo numero  telefono'
                },
                value: '' + this.props.profilo.numeroTelefono + '',
                validation: {
                    minLength: 10,
                    maxLength: 10
                },
                valid: true,
                touched: false
            },
            nazionalita: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'italia', displayValue: 'Italia' },
                        { value: 'irlanda', displayValue: 'Irlanda' },
                        { value: 'svezia', displayValue: 'Svezia' },
                        { value: 'finlandia', displayValue: 'Finlandia' },
                        { value: 'grecia', displayValue: 'Grecia' },
                        { value: 'spagna', displayValue: 'Spagna' },
                        { value: 'inghilterra', displayValue: 'Inghilterra' }
                    ]
                },
                value: '' + this.props.profilo.nazionalità + '',
                valid: true
            },
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'username'
                },
                value: '' + this.props.profilo.username + '',
                validation: {
                    isUsername: true
                },
                valid: true,
                touched: false
            }

        }
    }


    clickMenuHandler = (props) => {
       this.setState({ showDropdown: !this.state.showDropdown });
        this.setState({ idArticoloCambiamenti: props });
    }
    handlerClickPresentazione() {
        this.setState({ presentazione: false })
    }
    hideModal = () => {
        this.setState({ show: false })
    }
    showModal = () => {
        this.setState({ show: true })
    }
    hideModalPassword = () => {
        this.setState({ modalPassword: false })
    }
    showModalPassword = () => {
        this.setState({ modalPassword: true })
    }

    handlerChangeEmail = ()=>{

        this.showModal();
        this.props.onChangeEmail(this.state.email.value);
        setTimeout(() => {
            if (this.props.esitoLogin === "Il cambio e-mail è stato completato") {
                window.location.reload();
            }
        }, 1000)
    }
    passswordChangeHandler = ()=>{
        let errorePassword=false;
        let passwordData = {};
        for (let passwordElementIdentifier in this.state.password) {
            passwordData[passwordElementIdentifier] = this.state.password[passwordElementIdentifier].value;
        }
        const psw ={
            oldpassword:passwordData.oldpassword,
            newpassword1:passwordData.newpassword1,
            newpassword2:passwordData.newpassword2
        }
        let url = 'http://localhost:4001/login';
        const authData ={
            username : localStorage.getItem("email"),
            password:psw.oldpassword,
          }
          axios.post(url,authData)
          .then(response=>{
             console.log(response)
          })
          .catch(error =>{
            errorePassword=true;
            this.showModalPassword();
            this.setState({messageModalPassord : <Modal show={true} modalClosed={()=>this.hideModalPassword()}>
                Errore!!
                La vecchia password inserita non corrisponde a quella memorizzata,si prega di reinserire correttamente la vecchia password.
            </Modal> })

          })

          if(psw.newpassword1 !== psw.newpassword2){
            errorePassword=true;
            this.showModalPassword();
            this.setState({messageModalPassord : <Modal show={true} modalClosed={()=>this.hideModalPassword()}>
            Errore!!
            Purtroppo la nuova password inserita non risulta uguale in entrambi i campi, si prega di reinserire correttamente la nuova password da utilizzare.
            </Modal> })
          }

          if(!errorePassword){
              //completo il cambio password
              this.showModal();
              this.props.onChangePassword(psw.newpassword1);
              setTimeout(() => {
                if (this.props.esitoLogin === "Il cambio password è stato completato") {
                    window.location.reload();
                }
            }, 1000)
          }

    }
    orderHandler = () => {
        this.showModal();
        const formData = {};
        for (let formElementIdentifier in this.state.profileForm) {
            formData[formElementIdentifier] = this.state.profileForm[formElementIdentifier].value;
        }
        const profile = {
            _id:this.state.idProfilo,
            nome: formData.nome,
            cognome: formData.cognome,
            dataNascita: formData.dataNascita.trim(),
            sesso: formData.sesso.trim(),
            numeroTelefono: formData.numeroTelefono.trim(),
            nazionalità: (formData.nazionalita.trim() === '' ? 'italia' : formData.nazionalita.trim()),
            img: this.state.img,
            username: formData.username.trim(),
            userId: localStorage.getItem('userId').trim(),
            descrizione: this.state.descrizione
        }
        //se il profilo è già in firebase allora faccio un update del profilo e poi se è cambiato anche l'username glielo cambio in tutta l'app
        //altrimenti mando il nuovo profilo.
        if (this.props.profiloReducer.length) {
            console.log(this.props.profiloReducer);
            this.props.onUpdateData(profile, this.props.profiloReducer[0].profilo._id);
            this.props.articoli.map((articolo) => {
                //faccio il map per ogni articolo per cambiare l'autore e l'username nei messaggi
                //se non è il proprietario dell'articolo faccio solo il controllo sui messaggi e cambi l'username
                if (articolo.articolo.userId === localStorage.getItem("userId")) {
                    let messaggioUpdate;
                    if (articolo.articolo.messaggi !== undefined) {
                        messaggioUpdate = articolo.articolo.messaggi.map((messaggio) => {
                            if (messaggio.username === localStorage.getItem("username")) {
                                messaggio.username = profile.username
                            }
                            return messaggio;
                        })
                    }
                    let updateArticolo = {
                        ...articolo.articolo,
                        autore: profile.username,
                        messaggi: (messaggioUpdate === undefined ? [] : messaggioUpdate),
                    }
                    this.props.onUpdateArticolo(updateArticolo, articolo.key);
                    return null;
                }
                else if (articolo.articolo.userId !== localStorage.getItem("userId")) {
                    let messaggioUpdate;
                    if (articolo.articolo.messaggi !== undefined) {
                        messaggioUpdate = articolo.articolo.messaggi.map((messaggio) => {
                            if (messaggio.username === localStorage.getItem("username")) {
                                messaggio.username = profile.username
                            }
                            return messaggio;
                        })
                    }
                    let updateArticolo = {
                        ...articolo.articolo,
                        messaggi: (messaggioUpdate === undefined ? [] : messaggioUpdate),
                    }
                    this.props.onUpdateArticolo(updateArticolo, articolo.key);
                    return null;
                }
                else return null;
            })
        }
        else {
            this.props.onSendData(profile);
        }
        setTimeout(() => {
            if (this.props.esito === "I dati sono stati inviati/modificati con successo.") {
                window.location.reload();
            }
        }, 1000)
    }
    handlerModificaDati() {
        this.setState({ modificaDati: !this.state.modificaDati })
        setTimeout(() => {
            window.scrollTo(0, 609)
        }, 40);
    }
    descrizioneChangeHandler = (event) => {
        this.setState({ descrizione: event.target.value })
    }
    inputChangePassword = (event , inputIdentifier) =>{
        const updatedPasswordForm = {
            ...this.state.password
        }
        const updatedPasswordElement = {
            ...updatedPasswordForm[inputIdentifier]
        }
        updatedPasswordElement.value = event.target.value;
        updatedPasswordElement.valid = checkValidity(updatedPasswordElement.value, updatedPasswordElement.validation);
        updatedPasswordElement.touched = true;
        updatedPasswordForm[inputIdentifier] = updatedPasswordElement;
        let passwordIsValid = true;
        for(let inputIdentifier in updatedPasswordForm){
            passwordIsValid = updatedPasswordForm[inputIdentifier].valid && passwordIsValid;
        }
        this.setState({ password : updatedPasswordForm, passwordIsValid : passwordIsValid})

    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedprofileForm = {
            ...this.state.profileForm
        }
        const updatedFormElement = {
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
        this.setState({ profileForm: updatedprofileForm, formIsValid: formIsValid });

    }
    inputChangeEmail = (event) => {
        const updateEmail ={
            ...this.state.email
        }
        updateEmail.value=event.target.value;
        updateEmail.valid = checkValidity(updateEmail.value,updateEmail.validation);
        updateEmail.touched = true;

        let emailIsValid = updateEmail.valid;
        this.setState({email : updateEmail, emailIsValid : emailIsValid})
    }
    clickCloseImg(){         
        this.setState({anteprimaImg:null,
                        img:null})
        document.getElementById("inputFile").value = null;
    }
    convertFile = (e) => {
        let reader = new FileReader();
        if (e !== undefined) {
            reader.readAsDataURL(e);
            reader.onloadend = () => {

                this.setState({ img: reader.result, anteprimaImg:(<div className={classes.ImgClose}><img className={classes.InputImg} src={reader.result} alt="" /><i className="material-icons" onClick = {()=>this.clickCloseImg()}>close</i></div>) })
            }
        }
        else {
            this.setState({ img: null, anteprimaImg: null })
            document.getElementById("inputFile").value = null;
        }
    };
    checkValidityOfInput = (event, id) => {
        let newObj = updateObject(this.state.profileForm[id], { value: event.target.value, valid: checkValidity(event.target.value, this.state.profileForm[id].validation), touched: true });
        let newForm = updateObject(this.state.profileForm, { [id]: { ...newObj } })
        let formIsValid = true;
        for (let key in newForm) {
            formIsValid = newForm[key].valid && formIsValid;
        }
        this.setState({ isFormValid: formIsValid, profileForm: newForm })
    }
    clickHeartHandler(art) {
        let length = art.articolo.like.length;
        let c = 0;
        let heartChange = art.articolo.like.map((object) => {
            if (object.username === localStorage.getItem("username")) {
                object.like = !object.like
            }
            else {
                c++;
            }
            return object
        })
        if (c === length) {
            heartChange.push({ like: true, username: localStorage.getItem("username") })
        }
        const anteprima = {
            ...art.articolo,
            like: heartChange
        }
        const id = art.key;
        axios.put('https://blog-monika-andrea.firebaseio.com/articoli/' + id + '.json?auth=' + localStorage.getItem("token"), anteprima)
            .then(response => {
                this.props.mount();
            })
            .catch(error => console.log(error));
    }
    render() {
        let { anteprimaImg, presentazione, modificaDati, showDropdown, messageModalPassord, modalPassword } = this.state;
        let { loading, mount,   loadingLogin } = this.props;
        console.log("rirender");
        let email;
        let modificaEmail;
        let modificaPassword;
        email = localStorage.getItem('email');

        let presentazioneVisualizzata;
        let btnInviaInfo = null;
        {
            presentazione === null ?
                presentazioneVisualizzata = <button className={classes.BtnPresentazione} onClick={() => this.handlerClickPresentazione()}><i>Aggiungi una breve presentazione</i></button>
                : presentazione === false && ((presentazioneVisualizzata = <div style={{ marginTop: '-27px', height: '49%' }}><blockquote></blockquote><Input type="text" config={{ placeholder: 'breve presentazione di te' }} changed={this.descrizioneChangeHandler} value={this.state.descrizione} /></div>) && (btnInviaInfo = <button onClick={this.orderHandler} className={classes.ButtonSend}  ><IoIosSend style={{ verticalAlign: 'middle', marginRight: '4px' }} />Invia breve presentazione</button>))
        }


        modificaEmail = (<div><h3>MODIFICA EMAIL</h3>
            <Input
                type={this.state.email.elementType}
                config={this.state.email.elementConfig}
                value={this.state.email.value}
                changed={(event) => this.inputChangeEmail(event)}
                touched={this.state.email.touched}
                shouldValidate={this.state.email.validation}
                valid={this.state.email.valid}
            />
        <button className={classes.ButtonSend} onClick={this.handlerChangeEmail} disabled={!this.state.emailIsValid} ><IoIosSend style={{ verticalAlign: 'middle', marginRight: '4px' }} />Modifica l'e-mail</button>
            <br/>
        </div>)

        let passwordElementsArray = [];
        for(let key in this.state.password){
            passwordElementsArray.push({
                id:key,
                psw:this.state.password[key]
            })
        }
        modificaPassword = ( <div><h3>MODIFICA PASSWORD</h3>
           {passwordElementsArray.map(elementArray=>(
               <Input
                    key={elementArray.id}
                    type={elementArray.psw.elementType}
                    config={elementArray.psw.elementConfig}
                    value={elementArray.psw.value}
                    changed={(event) => this.inputChangePassword(event, elementArray.id)}
                    touched = {elementArray.psw.touched}
                    shouldValidate = {elementArray.psw.validation}
                    valid = {elementArray.psw.valid}
               />
           ))}
          <button className={classes.ButtonSend} onClick={this.passswordChangeHandler} disabled={!this.state.passwordIsValid} ><IoIosSend style={{ verticalAlign: 'middle', marginRight: '4px' }} />Modifica la password</button>
            <br/>
        </div>
        )
        const formElemetsArray = [];
        for (let key in this.state.profileForm) {
            formElemetsArray.push({
                id: key,
                config: this.state.profileForm[key],

            })
        }
        let form = (
            <form>
                {formElemetsArray.map(formElement => (
                    console.log(formElement),
                    formElement.id !== 'username' ? <Input
                        key={formElement.id}
                        type={formElement.config.elementType}
                        config={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        valid={formElement.config.valid}
                    /> : formElement.id === 'username' ? <div key={formElement.id}>
                        <h3>MODIFICA IL TUO USERNAME</h3>
                        <Input
                            key={formElement.id}
                            type={formElement.config.elementType}
                            config={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            touched={formElement.config.touched}
                            shouldValidate={formElement.config.validation}
                            valid={formElement.config.valid} /></div> : null
                )
                )}
            </form>
        );
        let pageModificaDati = (<div className={classes.ModificaDati}>
             {modificaEmail}
             {modificaPassword}
            <h3>MODIFICA I TUOI DATI</h3>
            {form}
            <h3>MODIFICA LA TUA FOTO PROFILO</h3>
            <div className={classes.DivFoto} >
                <button className={classes.CaricaImgButton} onClick={() => document.getElementById("inputFile").click()}> <i className="material-icons" style={{ verticalAlign: 'middle' }}>photo_camera</i> Carica foto profilo</button>

                {anteprimaImg ? anteprimaImg : null}</div>
            <input id="inputFile" type="file" accept="image/png,image/gif,image/jpeg, image/jpg" onChange={event => this.convertFile(event.target.files[0])} style={{ width: '0px' }}/* style = {{display:'none', visibility:'hidden',zIndex:'-200'}}*/ />
            <button className={classes.ButtonSend} onClick={this.orderHandler} disabled={!this.state.formIsValid} style={{ position: 'absolute', right: '0px', bottom: '0px' }}><IoIosSend style={{ verticalAlign: 'middle', marginRight: '4px' }} />Invia dati</button>
        </div>);

        const personal_article = [...this.props.articoli];

        let articoliVisualizzati;
        articoliVisualizzati = personal_article.map((art) => {
            if (art.articolo.userId === localStorage.getItem('userId')) {
                return (
                    <AnteprimaArticolo
                        id={art.articolo._id}
                        autore={art.articolo.autore}
                        categoria={art.articolo.categoria}
                        descrizione={art.articolo.descrizione}
                        img={art.articolo.img}
                        like={art.articolo.like}
                        sottotitolo={art.articolo.sottotitolo}
                        testo={art.articolo.testo}
                        titolo={art.articolo.titolo}
                        data={art.articolo.data}
                        minuti={art.articolo.minuti}
                        disableMore={false}
                        showDropdown={this.state.idArticoloCambiamenti === art.articolo._id ? showDropdown : false}
                        mount={mount}
                        clickMenuHandler={this.clickMenuHandler}
                        UpdateArticolo={this.props.clickUpdateArticolo}
                        clickHeart={() => this.clickHeartHandler(art)}
                        key={art.articolo._id} />
                );
            } else return null;
        })
        if (loading) {
            pageModificaDati = <Spinner />
        }
        let modal = null;

        if (loading === false ||    loadingLogin === false) {
            modal = (<Modal show={this.state.show} modalClosed={this.hideModal}>
                {this.props.esito === '' ? null : this.props.esito}
                {this.props.esitoLogin === '' ? null : this.props.esitoLogin}
            </Modal>);
        }


        return (
            <div className={classes.Profilo} onClick={showDropdown ? this.clickMenuHandler : null}>
                {modalPassword ? messageModalPassord : null}
                {!loading ? modal : null}
                <div>
                    <h1>Profilo Persona</h1>
                </div>
                <div className={classes.Informazioni} style={presentazione === null ? null : { height: '185px' }}>
                    <h3>INFORMAZIONI</h3>
                BREVE PRESENTAZIONE: {presentazioneVisualizzata}
                    {btnInviaInfo}
                </div>

                <div className={classes.DatiPersonali}>

                    <h3>DATI PERSONALI</h3>
                    <div style={{ marginBottom: '10px', fontSize: '18px', lineHeight: '35px' }}>
                        <hr />
                Email : {email}<br />
                Username:{this.props.profilo.username !== "" ? this.props.profilo.username : <b>non ancora inserito</b>}<br />
                        <hr />
                Nome : {this.props.profilo.nome !== "" ? this.props.profilo.nome : <b>non ancora inserito</b>}<br />
                Cognome: {this.props.profilo.cognome !== "" ? this.props.profilo.cognome : <b>non ancora inserito</b>}<br />
                Data di nascita: {this.props.profilo.dataNascita !== "" ? this.props.profilo.dataNascita : <b>non ancora inserita</b>}<br />
                Sesso: {this.props.profilo.sesso !== "" ? this.props.profilo.sesso : <b>non ancora inserito</b>}<br />
                Numero di telefono: {this.props.profilo.numeroTelefono !== "" ? this.props.profilo.numeroTelefono : <b>non ancora inserito</b>}<br />
                Nazionalità: {this.props.profilo.nazionalità !== "" ? this.props.profilo.nazionalità : <b>non ancora inserita</b>}<br />
                        <hr />
                        <div className={this.props.profilo.img ? classes.ImgMediaQuery : null}>
                            Foto profilo: {this.props.profilo.img !== undefined ? <img  style={{ width: '15%', marginBottom: '-6%', borderStyle: 'outset' }} src={this.props.profilo.img} alt="" /> : <b>Non ancora inserita</b>}
                        </div>
                    </div>
                    <div>
                        <button className={classes.ButtonSend} style={{ marginTop: '-25px' }} onClick={() => this.handlerModificaDati()}><MdEmail style={{ verticalAlign: 'middle' }} /> Mostra dati da modificare</button>
                    </div>
                </div>
                {(modificaDati) ? pageModificaDati : null}

                {articoliVisualizzati}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        articoli: state.articolo.articoli,
        loading: state.profilo.loading,
        esito: state.profilo.esitoCaricamento,
        profiloReducer: state.profilo.profilo,
        loadingLogin: state.login.loading,
        esitoLogin:state.login.esitoCaricamento

    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onGoogleAuth: () => dispatch(actions.googleAuth()),
        // onLogin : (email,password,isSignup,errore) => dispatch(actions.login(email,password,isSignup,errore)),
        // onSetLoginRedirectPath: () => dispatch(actions.setLoginRedirectPath('/'))
        onSendData: (data) => dispatch(actions.sendData(data)),
        onUpdateData: (data, idProfilo) => dispatch(actions.updateData(data, idProfilo)),
        onUpdateArticolo: (articolo, idArticolo) => dispatch(actions.updateArticolo(articolo, idArticolo)),
        onChangeEmail : (email) => dispatch(actions.updateEmail(email)),
        onChangePassword:(password) => dispatch(actions.updatePassword(password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profilo);
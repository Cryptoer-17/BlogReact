import React, {Component} from 'react';
import classes from './Login.module.css';
import Modal from '../../Components/UI/Modal/Modal';
import checkValidity from '../../utility/validation';
import Input from '../../Components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import {connect } from 'react-redux';
import { withRouter } from "react-router";
import updateObject  from '../../utility/updateObject';

class Login extends Component{

state = {
loginForm: {
    email:{
        type:"text",
        value:"",
        valid:false,
        touched:false,
      config:
        { 
         placeholder: "Email"},
        validation: {
        isEmail:true,
        required:true
        }
    },
    password:{
        type:"password",
        value: "",
        valid:false,
        touched:false,
        config:
        {placeholder: "Password",
         autoComplete: "current-password"},
        validation: {
            minLength: 6,
            required:true
        }
    }
},
isFormValid : false,
isSignup: true
}


switchAuthModeHandler = () =>{
    this.setState(prevState =>{
        return {isSignup : !prevState.isSignup};
    })
}


checkValidityOfInput = (event, id) =>{

    let newObj = updateObject(this.state.loginForm[id], {value: event.target.value, valid:checkValidity(event.target.value, this.state.loginForm[id].validation), touched:true});
    let newForm = updateObject(this.state.loginForm, {[id]: {...newObj}});
    let formIsValid = true;
    for (let key in newForm) {
        formIsValid = newForm[key].valid && formIsValid;
    }
        this.setState({isFormValid:formIsValid, loginForm: newForm})
}

checkValidityOfUsername= (event) =>{
    let newObj = updateObject(this.state.signUpForm.username, {value: event.target.value, valid:checkValidity(event.target.value, this.state.signUpForm.username.validation), touched:true});
    let newForm = updateObject(this.state.signUpForm, {username: {...newObj}} );
    let formIsValid = newObj.valid;
    this.setState({isUsernameValid:formIsValid, signUpForm: newForm})
    }


submitHandlerSignIn = (event) =>{   
    event.preventDefault();  
    const errore="Problemi di accesso, controlla che i dati inseriti siano corretti";
    this.props.onLogin(this.state.loginForm.email.value, this.state.loginForm.password.value, false,errore);
    //this.props.hideGoogle();
    this.props.hideModal();
     this.props.showMessage();
    this.props.messageLogin();
      setTimeout(() => {
        window.location.reload();
    }, 1500); 
}

submitHandlerSignUp = (event) =>{   
    event.preventDefault();  
    const errore = "Problemi di registrazione, controlla che la mail inserita non sia già esistente";
    this.props.onLogin(this.state.loginForm.email.value, this.state.loginForm.password.value, true,errore);
   // this.props.hideGoogle();
    this.props.hideModal();
   this.props.showMessage();
    this.props.messageRegister();
    setTimeout(() => {
        window.location.reload();
    }, 2500); 
}


render(){
    
const {show, hideModal} = this.props;
const {loginForm, isFormValid} = this.state;

const formData = [];

    for(let key in loginForm){
        formData.push( {id: key , obj: loginForm[key] });
    };
    
    let form = formData.map(el =>
        <Input 
        show = {show}
        value = {el.obj.value}
        key = {el.id}
        type = {el.obj.type}
        config = {el.obj.config}
        touched = { el.obj.touched}
        valid = { el.obj.valid}
        changed = {(e) => this.checkValidityOfInput(e, el.id)}
        shouldValidate = {el.obj.validation}
        />
        )
    
    return(
    <div>
    <Modal show = {show}  modalClosed = {  hideModal }>
    <div className = {classes.Login}>
    <h3>Login</h3>  
    <form>       
      {form}  
    <div className = {classes.ButtonContainer}>
        <button className = {classes.AccediButton} onClick = { this.submitHandlerSignIn}  disabled = { !isFormValid} > Accedi</button>
      {/* <button className = {classes.AccediGoogleButton} onClick = {() => {onGoogleAuth(); hideModal(); showGoogle(); showMessage(); messageLogin();}}> Accedi con Google</button> */}  
    </div>
     <button className = {classes.RegistratiButton}  onClick = {this.submitHandlerSignUp} disabled = { !isFormValid}> Registrati</button>     
    </form>
    </div>
    </Modal>
</div>
    );
}
}

const mapStateToProps = state =>{
    return{
  user: state.login.user,
        error : state.login.error,
        isAuthenticated : state.login.token !== null

    };
};

const mapDispatchToProps = dispatch => {
    return{
    onGoogleAuth: () => dispatch(actions.googleAuth()),
    onLogin : (email,password,isSignup,errore) => dispatch(actions.login(email,password,isSignup,errore)),
    onSetLoginRedirectPath: () => dispatch(actions.setLoginRedirectPath('/'))

    };
  };

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));



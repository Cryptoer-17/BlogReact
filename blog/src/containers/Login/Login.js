import React, {Component} from 'react';
import classes from './Login.module.css';
import Modal from '../../Components/UI/Modal/Modal';
import checkValidity from '../../utility/validation';
import Input from '../../Components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import {connect } from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';

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

loginWithPassword = () =>{
    /*
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDGI-n4ck_c8QjD1hxtunkeLDaGZRLGnrU";
    const data = {email: this.state.email, password: this.state.password, returnSecureToken:true}
    axios.post(url,data ).then( response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token',response.data.idToken);
        localStorage.setItem('userId',response.data.localId);
        localStorage.setItem('expirationDate', expirationDate);
}).catch(err => console.log(err));

*/

this.props.hideModal();
}

signUpWithPassword = () =>{
    /*
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDGI-n4ck_c8QjD1hxtunkeLDaGZRLGnrU";
    const data = {email: this.state.email, password: this.state.password, returnSecureToken:true}
    axios.post(url,data ).then( response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token',response.data.idToken);
        localStorage.setItem('userId',response.data.localId);
        localStorage.setItem('expirationDate', expirationDate);
}).catch(err => console.log(err));
*/
this.props.hideModal();
}



submitHandler = (event) =>{
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value, this.state.isSignup);
}

switchAuthModeHandler = () =>{
    this.setState(prevState =>{
        return {isSignup : !prevState.isSignup};
    })
}

checkValidityOfInput = (event, id) =>{

let newObj = { ...this.state.loginForm[id], value: event.target.value, valid:checkValidity(event.target.value, this.state.loginForm[id].validation), touched:true };

let newForm = {...this.state.loginForm,  [id]: {...newObj}}

let formIsValid = true;

for (let key in newForm) {
    formIsValid = newForm[key].valid && formIsValid;
}
    this.setState({isFormValid:formIsValid, loginForm: newForm})

}

submitHandler = (event) =>{
    event.preventDefault();
    this.props.onLogin(this.state.loginForm.email.value, this.state.loginForm.password.value, this.state.isSignup);
}


render(){
const {show, onGoogleAuth, user, hideModal} = this.props;
const {loginForm, isFormValid} = this.state;

const formData = [];


if(!this.props.isAuthenticated){
    for(let key in this.state.loginForm){
        formData.push( {id: key , obj: loginForm[key] });
    };
    
    
    let form = formData.map(el =>
        <Input 
        show = {this.props.show}
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
    
        if(this.props.loading){
            form = <Spinner />
        }
    
    return(
    
    <Modal show = {show}  modalClosed = {  hideModal }>
    <div className = {classes.Login}>
    <h3>Login</h3>
    
    <form onSubmit={this.submitHandler}>
        
      {form}  
    <div className = {classes.ButtonContainer}>
        <button className = {classes.AccediButton} onClick = {this.handlerClick}  disabled = { !isFormValid} > Accedi</button>
        <button className = {classes.AccediGoogleButton} onClick = {() => {onGoogleAuth(); hideModal(); }}> Accedi con Google</button>
    </div>
     <button className = {classes.RegistratiButton}  onClick = {this.signUpWithPassword} disabled = { !isFormValid}> Registrati</button> 
    
    
        
    </form>
    
    </div>
    
    </Modal>
    
    );
}else return null;


}
}

const mapStateToProps = state =>{
    return{
  user: state.login.user,
  loading: state.login.loading,
        error : state.login.error,
        isAuthenticated : state.login.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return{
    onGoogleAuth: () => dispatch(actions.googleAuth()),
    onLogin : (email,password) => dispatch(actions.login(email,password))
    };
  };



export default connect(mapStateToProps,mapDispatchToProps)(Login);



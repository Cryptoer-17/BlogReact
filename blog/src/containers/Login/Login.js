import React, {Component} from 'react';
import classes from './Login.module.css';
import Modal from '../../Components/UI/Modal/Modal';
import axios from 'axios';
import checkValidity from '../../utility/validation';

class Login extends Component{

state = {
email:{
    value:"",
    isEmail:true,
    isRequired:true
},
password:{
    value: "",
    isRequired:true,
    minLength:6

},
isFormValid : false
}



loginWithPassword = () =>{
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDGI-n4ck_c8QjD1hxtunkeLDaGZRLGnrU";
    const data = {email: this.state.email, password: this.state.password, returnSecureToken:true}
    axios.post(url,data ).then( response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token',response.data.idToken);
        localStorage.setItem('userId',response.data.localId);
        localStorage.setItem('expirationDate', expirationDate);
}).catch(err => console.log(err));

this.props.hideModal();
}

signUpWithPassword = () =>{
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDGI-n4ck_c8QjD1hxtunkeLDaGZRLGnrU";
    const data = {email: this.state.email, password: this.state.password, returnSecureToken:true}
    axios.post(url,data ).then( response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token',response.data.idToken);
        localStorage.setItem('userId',response.data.localId);
        localStorage.setItem('expirationDate', expirationDate);
}).catch(err => console.log(err));

this.props.hideModal();


}



render(){

return(

<Modal show = {  this.props.show}  modalClosed = {this.props.hideModal}>
<div className = {classes.Login}>
<h3>Login</h3>
<form>
<input autoFocus className = {classes.Input}  type = "text" placeholder = "Email" onChange={( event ) => this.setState( { email: event.target.value } )}  required autoComplete = "username" />
<input className = {classes.Input} type = "password" placeholder = "Password" onChange={( event ) => this.setState( { password: event.target.value } )} autoComplete = "password"   />
</form>
<div className = {classes.ButtonContainer}>
    <button className = {classes.AccediButton} onClick = {this.loginWithPassword}  disabled = { this.state.username === "" || this.state.password === "" ? true : false}  > Accedi</button>
    <button className = {classes.AccediGoogleButton} > Accedi con Google</button>
</div>
 <button className = {classes.RegistratiButton}  onClick = {this.signUpWithPassword} disabled = { this.state.username === "" || this.state.password === "" ? true : false}> Registrati</button> 

</div>

</Modal>


);


}

}
export default Login;
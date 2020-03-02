import React, {Component} from 'react';
import classes from './Login.module.css';
import {NavLink} from 'react-router-dom';
import Modal from '../../Components/UI/Modal/Modal';
import Logo from '../../assets/images/logoGoogle.png'
import axios from 'axios';


class Login extends Component{

state = {
email:"",
password:""
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

<NavLink to = "/" onClick = {this.props.hideModal}> <button className = {classes.RegistratiButton}  onClick = {this.signUpWithPassword}> Registrati</button> </NavLink>

</div>

</Modal>


);


}

}
export default Login;
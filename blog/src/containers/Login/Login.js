import React, {Component} from 'react';
import classes from './Login.module.css';
import {NavLink} from 'react-router-dom';
import Modal from '../../Components/UI/Modal/Modal';
import Logo from '../../assets/images/logoGoogle.png'

class Login extends Component{

state = {
username:"",
password:""
}


render(){

return(

<Modal show = {  this.props.show}  modalClosed = {this.props.hideModal}>
<div className = {classes.Login}>
<h3>Login</h3>
<form>
<input autoFocus className = {classes.Input}  type = "text" placeholder = "Username" onChange={( event ) => this.setState( { username: event.target.value } )}  required autoComplete = "username" />
<input className = {classes.Input} type = "password" placeholder = "Password" onChange={( event ) => this.setState( { password: event.target.value } )} autoComplete = "password"   />
</form>
<div className = {classes.ButtonContainer}>
    <button className = {classes.AccediButton}  disabled = { this.state.username === "" || this.state.password === "" ? true : false}  > Accedi</button>
    <button className = {classes.AccediGoogleButton} > Accedi con Google</button>
</div>

<NavLink to = "/" onClick = {this.props.hideModal}> <button className = {classes.RegistratiButton} > Registrati</button> </NavLink>

</div>

</Modal>


);


}

}
export default Login;
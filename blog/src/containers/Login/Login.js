import React, {Component} from 'react';
import classes from './Login.module.css';
import {NavLink} from 'react-router-dom';
import Modal from '../../Components/UI/Modal/Modal';


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
<input autoFocus className = {classes.Input}  type = "text" placeholder = "Username" onChange={( event ) => this.setState( { titolo: event.target.value } )}  required  />
<input className = {classes.Input} type = "password" placeholder = "Password" onChange={( event ) => this.setState( { sottotitolo: event.target.value } )}  />

<div className = {classes.ButtonContainer}>
<button className = {classes.AccediButton} > Accedi</button>
<button className = {classes.AccediButton} > Accedi con Google</button>
</div>
<button className = {classes.RegistratiButton} > Registrati</button>

</div>

</Modal>


);


}

}
export default Login;
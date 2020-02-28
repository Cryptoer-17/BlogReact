import React, {Component} from 'react';
import classes from './Login.module.css';
import {NavLink} from 'react-router-dom';
import Modal from '../../Components/UI/Modal/Modal';


class Login extends Component{

state = {
username:"",
password:"",
show:true
}

showModal = () =>{
    this.setState({show : true});
    }

hideModal = () =>{
        this.setState({show : false});
        }

render(){

 
return(

<div className = {classes.Login}>

<Modal show = {  this.state.show}  modalClosed = {this.hideModal}>


<input autoFocus className = {classes.Input}  type = "text" placeholder = "Username" onChange={( event ) => this.setState( { titolo: event.target.value } )}  required  />
<input className = {classes.Input} type = "password" placeholder = "Password" onChange={( event ) => this.setState( { sottotitolo: event.target.value } )}  />

<button className = {classes.AccediButton} > Accedi</button>
<button className = {classes.AccediButton} > Registrati</button>
</Modal>
</div>

);


}

}
export default Login;
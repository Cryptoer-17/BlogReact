import React, {Component} from 'react';
import classes from './Login.module.css';
import {NavLink} from 'react-router-dom';

class Login extends Component{

state = {
username:"",
password:"",
}


render(){

 
return(

<div className = {classes.Login}>



<input autoFocus className = {classes.Input}  type = "text" placeholder = "Username" onChange={( event ) => this.setState( { titolo: event.target.value } )}  required  />
<input className = {classes.Input} type = "password" placeholder = "Password" onChange={( event ) => this.setState( { sottotitolo: event.target.value } )}  />

<button className = {classes.AccediButton} > Accedi</button>
<button className = {classes.AccediButton} > Registrati</button>
</div>

);


}

}
export default Login;
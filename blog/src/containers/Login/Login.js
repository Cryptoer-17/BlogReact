import React, {Component} from 'react';
import classes from './Login.module.css';
import Modal from '../../Components/UI/Modal/Modal';
import axios from 'axios';
import checkValidity from '../../utility/validation';
import Input from '../../Components/UI/Input/Input';


class Login extends Component{

state = {
loginForm: {
    email:{
        type:"text",
        value:"",
        valid:false,
        touched:false,
        placeholder: "Email",
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
        placeholder: "Password",
        validation: {
            minLength: 6,
            required:true
        }
    }
},
isFormValid : false
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


checkValidityOfInput = (event, id) =>{

let newObj = { ...this.state.loginForm[id], value: event.target.value, valid:checkValidity(event.target.value, this.state.loginForm[id].validation), touched:true };

let newForm = {...this.state.loginForm,  [id]: {...newObj}}

let formIsValid = true;

for (let key in newForm) {
    formIsValid = newForm[key].valid && formIsValid;
}
    this.setState({isFormValid:formIsValid, loginForm: newForm})

}


render(){
const formData = [];

for(let key in this.state.loginForm){
    formData.push( {id: key , obj: this.state.loginForm[key] });
};



return(

<Modal show = {this.props.show}  modalClosed = {  this.props.hideModal }>
<div className = {classes.Login}>
<h3>Login</h3>

<form>
    
    {formData.map(el =>
        <Input 
        show = {this.props.show}
        value = {this.state[el.id]}
        key = {el.id}
        type = {el.type}
        placeholder = {el.obj.placeholder}
        touched = { el.obj.touched}
        valid = { el.obj.valid}
        changed = {(e) => this.checkValidityOfInput(e, el.id)}
        shouldValidate = {el.obj.validation}
        />
        ) }

    
</form>

<div className = {classes.ButtonContainer}>
    <button className = {classes.AccediButton} onClick = {this.loginWithPassword}  disabled = { !this.state.isFormValid} > Accedi</button>
    <button className = {classes.AccediGoogleButton} > Accedi con Google</button>
</div>
 <button className = {classes.RegistratiButton}  onClick = {this.signUpWithPassword} disabled = { !this.state.isFormValid}> Registrati</button> 

</div>

</Modal>


);


}

}
export default Login;
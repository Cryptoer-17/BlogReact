import React, {Component} from 'react';
import classes from './Username.module.css';
import Modal from '../../Components/UI/Modal/Modal';
import checkValidity from '../../utility/validation';
import Input from '../../Components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import {connect } from 'react-redux';
import { withRouter } from "react-router";


class Username extends Component{

state = {
    username:{
        type:"text",
        value:"",
        valid:false,
        touched:false,
      config:
        { 
         placeholder: "Username"},
        validation: {
        required:true,
        minLength:4,
        maxLength:15,
        isUsername:true
        }
},
isFormValid : false
}





checkValidityOfUsername= (event) =>{
    let newObj = { ...this.state.username, value: event.target.value, valid:checkValidity(event.target.value, this.state.username.validation), touched:true };
    let formIsValid = newObj.valid;
    this.setState({isUsernameValid:formIsValid, username:newObj})
    }


submitHandlerSignIn = (event) =>{   
    event.preventDefault();  

      setTimeout(() => {
        window.location.reload();
    }, 1500); 
}



render(){
    
const {show, modalClosed} = this.props;
const {username, isFormValid, signUpForm} = this.state;

  
    
    return(

        <Modal show = {show} modalClosed = {modalClosed}>
           <p>Prima di poter pubblicare degli articoli, devi scegliere un username.</p>
           <p>Puoi usare lettere, </p>
            <Input 
                    value = {username.value}
                    type = {username.type}
                    config = {username.config}
                    touched = {username.touched}
                    valid = { username.valid}
                    changed = {(e) => this.checkValidityOfUsername(e)}
                    shouldValidate = {username.validation}
                    />

         </Modal>



    );




}
}

const mapStateToProps = state =>{
    return{
         user: state.login.user
    };
};

const mapDispatchToProps = dispatch => {
    return{


    };
  };



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Username));



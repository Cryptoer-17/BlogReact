import React, {Component} from 'react';
import classes from './Username.module.css';
import Modal from '../../Components/UI/Modal/Modal';
import checkValidity from '../../utility/validation';
import Input from '../../Components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import {connect } from 'react-redux';
import { withRouter } from "react-router";
import { FaThumbsUp, FaThumbsDown} from "react-icons/fa";
import updateObject from '../../utility/updateObject';

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
    let newObj = updateObject(this.state.username,{value: event.target.value, valid:checkValidity(event.target.value, this.state.username.validation), touched:true}); 
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
const {username, isFormValid} = this.state;

  
    
    return(

        <Modal show = {show} modalClosed = {modalClosed}>
           <p>Prima di poter pubblicare degli articoli, devi scegliere un username.</p>
          
            <Input 
                    value = {username.value}
                    type = {username.type}
                    config = {username.config}
                    touched = {username.touched}
                    valid = { username.valid}
                    changed = {(e) => this.checkValidityOfUsername(e)}
                    shouldValidate = {username.validation}
                    />

        <div className = {classes.Rules}>
        <ul>
         <FaThumbsUp/>
        <li>Lettere</li>
        <li>Numeri</li>
        <li>Underscore (_)</li>
        </ul>
        <ul>
       <FaThumbsDown/>
        <li>Spazi</li>
        <li>Altri caratteri speciali ( ?, $, !,*, ecc..)</li>
        <li>Meno di 4 caratteri</li>
        <li>Più di 15 caratteri</li>
        </ul>
        </div>
       <button className = {classes.AnnullaButton} onClick = {modalClosed}>Annulla</button> <button className = {classes.ConfermaButton}>Conferma</button>
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



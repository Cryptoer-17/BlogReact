import React, {useState} from 'react';
import classes from './Navigazione.module.css';
import {NavLink} from 'react-router-dom';
import Login from '../../containers/Login/Login';
import Logout from '../../containers/Login/Logout';
import Ricerca from '../Ricerca/Ricerca';
import { fadeIn} from 'react-animations'
import styled, { keyframes } from 'styled-components';
import {connect } from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';
import Modal from '../UI/Modal/Modal';
import Username from '../../containers/Username/Username';

const AnimatedModal = styled.div`
animation: 0.3s ${keyframes`${fadeIn}`} `;

const Navigazione = (props) =>{

    const [show,setShow] = useState(false);
    const [showmsg, setShowMsg] = useState(false);
    const [google, setGoogle] = useState(false);
    const [message, setMessage] = useState("");
    const [showUsername,setShowUsername] = useState(false);

    const showMessage = () =>{
        setShowMsg(true);
    }

    const hideMessage = () =>{
        setShowMsg(false);
    }

    const showModal = () =>{
        hideMessage();
        setShow(true);
    }

    const hideModal = () =>{
           setShow(false);
        }

    const showGoogle =() =>{
        setGoogle(true);
    }

    const hideGoogle = () =>{
        setGoogle(false);
    }

    const messageLogin=() =>{
        setMessage("Login effettuato correttamente");
    }

    const messageRegister= () =>{
        setMessage("Registrazione effettuata correttamente");
    }

const showUsernameModal = () => {
    setShowUsername(true);

}
const hideUsernameModal = () =>{
    setShowUsername(false);
}

    let error= null;
    let messageSuccess = null;

    let form =  (<div>
    <nav className ={classes.BarraNavigazione}>
    <NavLink to = "/" exact> <p className = {classes.Titolo}>Blog</p> </NavLink>
    {localStorage.getItem("userId") ? <NavLink to="/"  exact className = {classes.Link} activeClassName = {classes.LinkAttivo}><i className="material-icons">home</i> </NavLink> : null}
    {localStorage.getItem("userId") && localStorage.getItem("username") ?  <NavLink to="/pubblica" className = {classes.Link}  activeClassName = {classes.LinkAttivo}><i className="material-icons">add_box</i> </NavLink> :  localStorage.getItem("userId") ?  <button className = {classes.Link}><i className="material-icons"  onClick = {showUsernameModal}>add_box</i> </button>  : null }
    {localStorage.getItem("userId") ? <NavLink to="/profilo" className={classes.Link} activeClassName={classes.LinkAttivo}><i className="material-icons">account_circle</i></NavLink> : null } 
    {localStorage.getItem("username") ? <p className = {classes.Username}> {localStorage.getItem("username") } </p> : null } 
     {(show && props.error===null && showmsg===false) ?  <AnimatedModal> { !localStorage.getItem("userId") ?  <Login show = {show} showGoogle={showGoogle} hideGoogle={hideGoogle} hideModal = {hideModal} messageLogin={messageLogin} showMessage={showMessage} hideMessage={hideMessage}  messageRegister={messageRegister}/> :  <Logout show = {show} google={google} hideModal = {hideModal}  />} </AnimatedModal>   : null}  
    {localStorage.getItem("userId") ?   <Ricerca className = {classes.Ricerca}/> : null }
    <button id = "loginButton" className = {classes.LoginNew}  onClick ={ showModal} >{localStorage.getItem("userId") ? 'LOGOUT' : 'LOGIN'}  </button> 
       
  </nav>
  </div>);

    if(props.loading){
        form = <Spinner />
    }

    if(props.error){
        error =(<Modal show={!show} modalClosed={showModal} >{props.error} </Modal>);
    }
    else if(props.error === null && props.userId!==null && showmsg){
        messageSuccess = ( <Modal show={showmsg} modalClosed={hideMessage} >{message}</Modal>   
        );
    }

    return(
        <div>
            {form}
            {messageSuccess}
            {error}
            
            <Username show ={showUsername} modalClosed ={hideUsernameModal}/>
        </div>
    );
}


const mapStateToProps = state =>{
    
    return{
        loading: state.login.loading,
        error : state.login.error,
        tokenId: state.login.token,
        userId : state.login.userId,
        loginRedirectPath: state.login.loginRedirectPath

    };
};

export default connect(mapStateToProps)(Navigazione);



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

const AnimatedModal = styled.div`
animation: 0.3s ${keyframes`${fadeIn}`} `;

const Navigazione = (props) =>{
    const {user, userId} = props;

    const [show,setShow] = useState(false);
    const [google, setGoogle] = useState(false);

    const showModal = () =>{
        setShow(true);
    }

    const hideModal = () =>{
           setShow(false);}

    const showGoogle =() =>{
        setGoogle(true);
    }

    const hideGoogle = () =>{
        setGoogle(false);
    }

    let error= null;

    


    let form =  (<nav className ={classes.BarraNavigazione}>
    <NavLink to = "/" exact> <p className = {classes.Titolo}>Blog</p> </NavLink>
      <NavLink to="/"  exact className = {classes.Link} activeClassName = {classes.LinkAttivo}><i className="material-icons">home</i> </NavLink>
      <NavLink to="/pubblica" className = {classes.Link}  activeClassName = {classes.LinkAttivo}><i className="material-icons">add_box</i> </NavLink> 
      <Ricerca className = {classes.Ricerca}/>
      <button className = {classes.LoginButton} onClick ={ showModal} >  <i className="material-icons">account_circle</i>   </button> 
     {(show && props.error===null) ?  <AnimatedModal> { !localStorage.getItem("userId") ? <Login show = {show} showGoogle={showGoogle} hideGoogle={hideGoogle} hideModal = {hideModal} /> : <Logout show = {show} google={google} hideModal = {hideModal}  /> } </AnimatedModal>   : null}
       
  </nav>);

    if(props.loading){
        form = <Spinner />
    }

    if(props.error){
        
        error =(<Modal show={!show} modalClosed={hideModal}>{props.error.message} </Modal>);
    }

    return(
        <div>
            {form}
            {error}
        </div>
    );
}


const mapStateToProps = state =>{
    return{
        loading: state.login.loading,
        error : state.login.error
    };
};

export default connect(mapStateToProps)(Navigazione);



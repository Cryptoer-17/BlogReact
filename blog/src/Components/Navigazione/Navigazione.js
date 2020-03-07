import React, {useState} from 'react';
import classes from './Navigazione.module.css';
import {NavLink} from 'react-router-dom';
import Login from '../../containers/Login/Login';
import Logout from '../../containers/Login/Logout';
import Ricerca from '../Ricerca/Ricerca';
import { fadeIn} from 'react-animations'
import styled, { keyframes } from 'styled-components';


const AnimatedModal = styled.div`
animation: 0.3s ${keyframes`${fadeIn}`} `;

const Navigazione = (props) =>{
    const {user, userId} = props;

    const [show,setShow] = useState(false);

    const showModal = () =>{
        setShow(true);
    }

    const hideModal = () =>{
           setShow(false);}
    
    return(
        <nav className ={classes.BarraNavigazione}>
          <NavLink to = "/" exact> <p className = {classes.Titolo}>Blog</p> </NavLink>
            <NavLink to="/"  exact className = {classes.Link} activeClassName = {classes.LinkAttivo}><i className="material-icons">home</i> </NavLink>
            <NavLink to="/pubblica" className = {classes.Link}  activeClassName = {classes.LinkAttivo}><i className="material-icons">add_box</i> </NavLink> 
            <Ricerca className = {classes.Ricerca}/>
            <button className = {classes.LoginButton} onClick ={ showModal} >  <i className="material-icons">account_circle</i>   </button> 
            {console.log(show)}
           {show ?  <AnimatedModal> { !localStorage.getItem("userId") ? <Login show = {show} hideModal = {hideModal} /> : <Logout show = {show} hideModal = {hideModal}  /> } </AnimatedModal>   : null}
             
        </nav>
    );
}



export default Navigazione;



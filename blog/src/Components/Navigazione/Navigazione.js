import React, {useState} from 'react';
import classes from './Navigazione.module.css';
import {NavLink} from 'react-router-dom';
import Login from '../../containers/Login/Login';
import Ricerca from '../Ricerca/Ricerca';

const Navigazione = () =>{

    const [show,setShow] = useState(false);

    const showModal = () =>{
        setShow(true);
    }

    const hideModal = () =>{
           setShow(false);
            }
    

    return(
        <nav className ={classes.BarraNavigazione}>
            <NavLink to="/"  exact className = {classes.Link} activeClassName = {classes.LinkAttivo}><i className="material-icons">home</i> </NavLink>
            <NavLink to="/pubblica" className = {classes.Link}  activeClassName = {classes.LinkAttivo}><i className="material-icons">add_box</i> </NavLink>
            <Ricerca/>
            <button className = {classes.LoginButton} onClick ={ showModal} > <i className="material-icons">account_circle</i>   </button>


            <Login show = {show} hideModal = {hideModal} />
           
        </nav>
    );
}
export default Navigazione;


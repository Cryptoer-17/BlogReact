import React from 'react';
import classes from './Navigazione.module.css';
import {NavLink} from 'react-router-dom';


const Navigazione = () =>{
    return(
        <div className ={classes.BarraNavigazione}>
            <NavLink to="/" exact className = {classes.Link} activeClassName = {classes.LinkAttivo}><i className="material-icons">home</i> </NavLink>
            <NavLink to="/pubblica"exact className = {classes.Link}  activeClassName = {classes.LinkAttivo}><i className="material-icons">add_box</i> </NavLink>
            <NavLink to="/ricerca" exact className = {classes.LoginLink}  activeClassName = {classes.LinkAttivo}> <i class="material-icons">account_circle</i></NavLink>
        </div>
    );
}
export default Navigazione;
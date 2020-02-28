import React from 'react';
import classes from './Navigazione.module.css';
import {NavLink,Route} from 'react-router-dom';
import Login from '../../containers/Login/Login';


const Navigazione = () =>{
    return(
        <div className ={classes.BarraNavigazione}>
            <NavLink to="/" exact className = {classes.Link} activeClassName = {classes.LinkAttivo}><i className="material-icons">home</i> </NavLink>
            <NavLink to="/pubblica"exact className = {classes.Link}  activeClassName = {classes.LinkAttivo}><i className="material-icons">add_box</i> </NavLink>
            <NavLink to="/login"  className = {classes.LoginLink}  activeClassName = {classes.LinkAttivo}> <i className="material-icons">account_circle</i></NavLink>
            <Route path="/login"  component ={Login} />
        </div>
    );
}
export default Navigazione;
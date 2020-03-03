import React, {useState} from 'react';
import classes from './Ricerca.module.css';
import {NavLink} from 'react-router-dom';

const Ricerca = (props) =>{

    const [cerca, setCerca] = useState("");

    return(
        <div className ={classes.Ricerca}>
            <input type="text" placeholder=" Cerca..." onChange={(event) => setCerca(event.target.value) } />
            <NavLink to="/ricerca" exact className={classes.CercaButton} ><i className="material-icons">search</i></NavLink>
        </div>
    );
}
export default Ricerca;




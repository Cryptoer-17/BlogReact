import React from 'react';
import classes from './Autore.module.css';

const Autore = (props) =>{
    return(
        <div className ={classes.Autore}>
        
         <i className="material-icons" >account_circle</i>
         {props.name}
        </div>
    );
}
export default Autore;
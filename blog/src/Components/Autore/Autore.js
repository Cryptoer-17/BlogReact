import React from 'react';
import classes from './Autore.module.css';

const Autore = (props) =>{
    return(
        <div className ={classes.Autore}>
        
      {props.img ? props.img :   <i className="material-icons" >account_circle</i>}
         {props.name}
        </div>
    );
}
export default Autore;
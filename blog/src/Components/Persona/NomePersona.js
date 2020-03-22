import React from 'react';
import classes from './NomePersona.module.css';

const NomePersona = (props)=>{

    return(
        <div className={classes.NomePersona}>
            {props.children}
        </div>
    );
}
export default NomePersona;
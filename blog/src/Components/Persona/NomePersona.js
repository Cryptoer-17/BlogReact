import React from 'react';
import classes from './NomePersona.module.css';

const NomePersona = (props)=>{
    let colore;
    props.userArray.map((userPropriety)=>{
        if(userPropriety.username === props.children){
            colore = userPropriety.colore
        }
        return null;
    })
    return(
        <div className={classes.NomePersona} style={{color:colore}}>
            {props.children}
        </div>
    );
}
export default NomePersona;
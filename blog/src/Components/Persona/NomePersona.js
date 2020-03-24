import React from 'react';
import classes from './NomePersona.module.css';

const NomePersona = (props)=>{

    console.log(props.userArray);

    let colore;
    props.userArray.map((userPropriety)=>{
        if(userPropriety.username === props.children){
            console.log("ok");
            colore = userPropriety.colore
        }
    })

    return(
        <div className={classes.NomePersona} style={{color:colore}}>
            {props.children}
        </div>
    );
}
export default NomePersona;